import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAutoSave } from '../contexts/AutoSaveContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Save, Eye, Download, Share2, ArrowLeft } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import toast from 'react-hot-toast';

const PortfolioBuilderPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { savePortfolio, isSaving } = useAutoSave();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    jsonContent: '',
    status: 'IN_PROGRESS',
    isPublic: false
  });

  useEffect(() => {
    if (id) {
      fetchPortfolio();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (portfolio) {
      setFormData({
        title: portfolio.title || '',
        jsonContent: portfolio.jsonContent || '',
        status: portfolio.status || 'IN_PROGRESS',
        isPublic: portfolio.isPublic || false
      });
    }
  }, [portfolio]);

  // Auto-save functionality
  useEffect(() => {
    if (id && formData.jsonContent) {
      const timeoutId = setTimeout(() => {
        savePortfolio(id, formData);
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [formData, id, savePortfolio]);

  const fetchPortfolio = async () => {
    try {
      const response = await portfolioAPI.getPortfolio(id);
      setPortfolio(response.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      toast.error('Failed to load portfolio');
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      if (id) {
        await portfolioAPI.updatePortfolio(id, formData);
        toast.success('Portfolio saved successfully');
      } else {
        const response = await portfolioAPI.createPortfolio(formData);
        navigate(`/portfolio-builder/${response.data.id}`);
        toast.success('Portfolio created successfully');
      }
    } catch (error) {
      console.error('Error saving portfolio:', error);
      toast.error('Failed to save portfolio');
    }
  };

  const handlePreview = () => {
    // Open preview in new tab
    window.open(`/portfolio/${portfolio?.publicLink || 'preview'}`, '_blank');
  };

  const handleDownload = () => {
    // Implement PDF download functionality
    toast.success('Download feature coming soon!');
  };

  const handleShare = () => {
    if (portfolio?.publicLink) {
      navigator.clipboard.writeText(`${window.location.origin}/portfolio/${portfolio.publicLink}`);
      toast.success('Share link copied to clipboard');
    } else {
      toast.error('Please make the portfolio public first');
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Portfolio Builder</h1>
              <p className="text-gray-600">
                {isSaving ? 'Auto-saving...' : 'Build your professional portfolio'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              className="btn-secondary"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>
            <button
              onClick={handlePreview}
              className="btn-secondary"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Portfolio Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter portfolio title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio Content (JSON)
                  </label>
                  <textarea
                    name="jsonContent"
                    value={formData.jsonContent}
                    onChange={handleInputChange}
                    rows={20}
                    className="input-field font-mono text-sm"
                    placeholder="Enter your portfolio content in JSON format..."
                  />
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPublic"
                      checked={formData.isPublic}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Make this portfolio public
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status === 'COMPLETED'}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        status: e.target.checked ? 'COMPLETED' : 'IN_PROGRESS'
                      }))}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Mark as completed
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-96">
                {formData.jsonContent ? (
                  <div className="prose prose-sm max-w-none">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {formData.title || 'Untitled Portfolio'}
                    </h4>
                    <div className="text-sm text-gray-600">
                      <p>Portfolio content preview will be displayed here.</p>
                      <p className="mt-2">Status: {formData.status}</p>
                      <p>Visibility: {formData.isPublic ? 'Public' : 'Private'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <p>Start typing to see preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Assistant */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Assistant</h3>
              <div className="space-y-4">
                <button className="w-full btn-secondary text-left">
                  Generate project descriptions
                </button>
                <button className="w-full btn-secondary text-left">
                  Optimize for SEO
                </button>
                <button className="w-full btn-secondary text-left">
                  Suggest layout improvements
                </button>
                <button className="w-full btn-secondary text-left">
                  Check content quality
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PortfolioBuilderPage;
