import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Download, Share2, Eye } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import toast from 'react-hot-toast';

const PublicPortfolioPage = () => {
  const { publicLink } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, [publicLink]);

  const fetchPortfolio = async () => {
    try {
      const response = await portfolioAPI.getPublicPortfolio(publicLink);
      setPortfolio(response.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      toast.error('Portfolio not found');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    toast.success('Download feature coming soon!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Not Found</h1>
            <p className="text-gray-600">The portfolio you're looking for doesn't exist or is private.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{portfolio.title}</h1>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleDownload}
                className="btn-secondary"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
              <button
                onClick={handleShare}
                className="btn-primary"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Eye className="w-4 h-4 mr-2" />
            <span>Public Portfolio</span>
            <span className="mx-2">•</span>
            <span>Last updated: {new Date(portfolio.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Portfolio Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {portfolio.jsonContent ? (
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: portfolio.jsonContent }} />
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Portfolio Content</h3>
              <p className="text-gray-600">The portfolio content will be displayed here.</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-primary-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Create Your Own Professional Portfolio
          </h3>
          <p className="text-gray-600 mb-4">
            Join thousands of professionals who've created stunning portfolios with ResumeAI
          </p>
          <a
            href="/register"
            className="btn-primary"
          >
            Get Started Free
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PublicPortfolioPage;
