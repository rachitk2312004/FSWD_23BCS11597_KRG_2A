package com.resumebuilder.controller;

import com.resumebuilder.dto.PortfolioDto;
import com.resumebuilder.entity.Portfolio;
import com.resumebuilder.entity.User;
import com.resumebuilder.service.PortfolioService;
import com.resumebuilder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/portfolios")
@CrossOrigin(origins = "*")
public class PortfolioController {
    
    @Autowired
    private PortfolioService portfolioService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<?> getUserPortfolios(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            List<Portfolio> portfolios = portfolioService.getUserPortfolios(user);
            List<PortfolioDto> portfolioDtos = portfolios.stream()
                    .map(PortfolioDto::new)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(portfolioDtos);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getPortfolio(@PathVariable Long id, Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            Portfolio portfolio = portfolioService.getPortfolioById(id, user)
                    .orElseThrow(() -> new RuntimeException("Portfolio not found"));
            
            return ResponseEntity.ok(new PortfolioDto(portfolio));
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createPortfolio(@RequestBody Map<String, String> request, 
                                           Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            String title = request.get("title");
            if (title == null || title.trim().isEmpty()) {
                title = "New Portfolio";
            }
            
            Portfolio portfolio = portfolioService.createPortfolio(user, title);
            return ResponseEntity.ok(new PortfolioDto(portfolio));
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePortfolio(@PathVariable Long id, 
                                           @RequestBody Map<String, Object> updates,
                                           Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            String title = (String) updates.get("title");
            String jsonContent = (String) updates.get("jsonContent");
            Boolean isPublic = (Boolean) updates.get("isPublic");
            
            Portfolio.Status status = null;
            if (updates.get("status") != null) {
                status = Portfolio.Status.valueOf(updates.get("status").toString());
            }
            
            Portfolio portfolio = portfolioService.updatePortfolio(id, user, title, jsonContent, status, isPublic);
            return ResponseEntity.ok(new PortfolioDto(portfolio));
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PostMapping("/{id}/duplicate")
    public ResponseEntity<?> duplicatePortfolio(@PathVariable Long id, Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            Portfolio portfolio = portfolioService.duplicatePortfolio(id, user);
            return ResponseEntity.ok(new PortfolioDto(portfolio));
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePortfolio(@PathVariable Long id, Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            portfolioService.deletePortfolio(id, user);
            
            Map<String, String> success = new HashMap<>();
            success.put("message", "Portfolio deleted successfully");
            return ResponseEntity.ok(success);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/public/{publicLink}")
    public ResponseEntity<?> getPublicPortfolio(@PathVariable String publicLink) {
        try {
            Portfolio portfolio = portfolioService.getPublicPortfolio(publicLink)
                    .orElseThrow(() -> new RuntimeException("Portfolio not found"));
            
            return ResponseEntity.ok(new PortfolioDto(portfolio));
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
