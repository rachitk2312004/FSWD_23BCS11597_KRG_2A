package com.resumebuilder.service;

import com.resumebuilder.entity.Portfolio;
import com.resumebuilder.entity.User;
import com.resumebuilder.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class PortfolioService {
    
    @Autowired
    private PortfolioRepository portfolioRepository;
    
    public Portfolio createPortfolio(User user, String title) {
        Portfolio portfolio = new Portfolio(user, title);
        portfolio.setIsPublic(user.getIsPublicByDefault());
        if (portfolio.getIsPublic()) {
            portfolio.setPublicLink(UUID.randomUUID().toString());
        }
        return portfolioRepository.save(portfolio);
    }
    
    public List<Portfolio> getUserPortfolios(User user) {
        return portfolioRepository.findByUserOrderByUpdatedAtDesc(user);
    }
    
    public Optional<Portfolio> getPortfolioById(Long id, User user) {
        return portfolioRepository.findByIdAndUser(id, user);
    }
    
    public Portfolio updatePortfolio(Long id, User user, String title, String jsonContent, 
                                   Portfolio.Status status, Boolean isPublic) {
        Portfolio portfolio = portfolioRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));
        
        if (title != null) {
            portfolio.setTitle(title);
        }
        if (jsonContent != null) {
            portfolio.setJsonContent(jsonContent);
        }
        if (status != null) {
            portfolio.setStatus(status);
        }
        if (isPublic != null) {
            portfolio.setIsPublic(isPublic);
            if (isPublic && portfolio.getPublicLink() == null) {
                portfolio.setPublicLink(UUID.randomUUID().toString());
            } else if (!isPublic) {
                portfolio.setPublicLink(null);
            }
        }
        
        return portfolioRepository.save(portfolio);
    }
    
    public Portfolio duplicatePortfolio(Long id, User user) {
        Portfolio originalPortfolio = portfolioRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));
        
        Portfolio duplicatePortfolio = new Portfolio();
        duplicatePortfolio.setUser(user);
        duplicatePortfolio.setTitle(originalPortfolio.getTitle() + " (Copy)");
        duplicatePortfolio.setJsonContent(originalPortfolio.getJsonContent());
        duplicatePortfolio.setStatus(Portfolio.Status.IN_PROGRESS);
        duplicatePortfolio.setIsPublic(false);
        
        return portfolioRepository.save(duplicatePortfolio);
    }
    
    public void deletePortfolio(Long id, User user) {
        Portfolio portfolio = portfolioRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));
        portfolioRepository.delete(portfolio);
    }
    
    public Optional<Portfolio> getPublicPortfolio(String publicLink) {
        return portfolioRepository.findByPublicLink(publicLink);
    }
}
