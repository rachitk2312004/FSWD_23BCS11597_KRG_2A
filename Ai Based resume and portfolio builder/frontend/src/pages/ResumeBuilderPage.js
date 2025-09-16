import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAutoSave } from '../contexts/AutoSaveContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Save, Eye, Download, Share2, ArrowLeft } from 'lucide-react';
import { resumeAPI } from '../services/api';
import toast from 'react-hot-toast';

const ResumeBuilderPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { saveResume, isSaving } = useAutoSave();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    jsonContent: '',
    status: 'IN_PROGRESS',
    isPublic: false
  });

  useEffect(() => {
    if (id) {
      fetchResume();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (resume) {
      setFormData({
        title: resume.title || '',
        jsonContent: resume.jsonContent || '',
        status: resume.status || 'IN_PROGRESS',
        isPublic: resume.isPublic || false
      });
    }
  }, [resume]);

  // Auto-save functionality
  useEffect(() => {
    if (id && formData.jsonContent) {
      const timeoutId = setTimeout(() => {
        saveResume(id, formData);
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [formData, id, saveResume]);

  const fetchResume = async () => {
    try {
      const response = await resumeAPI.getResume(id);
      setResume(response.data);
    } catch (error) {
      console.error('Error fetching resume:', error);
      toast.error('Failed to load resume');
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
        await resumeAPI.updateResume(id, formData);
        toast.success('Resume saved successfully');
      } else {
        const response = await resumeAPI.createResume(formData);
        navigate(`/resume-builder/${response.data.id}`);
        toast.success('Resume created successfully');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume');
    }
  };

  const handlePreview = () => {
    // Open preview in new tab
    window.open(`/resume/${resume?.publicLink || 'preview'}`, '_blank');
  };

  const handleDownload = () => {
    // Implement PDF download functionality
    toast.success('Download feature coming soon!');
  };

  const handleShare = () => {
    if (resume?.publicLink) {
      navigator.clipboard.writeText(`${window.location.origin}/resume/${resume.publicLink}`);
      toast.success('Share link copied to clipboard');
    } else {
      toast.error('Please make the resume public first');
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
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
              <p className="text-gray-600">
                {isSaving ? 'Auto-saving...' : 'Build your professional resume'}
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
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Resume Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter resume title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume Content (JSON)
                  </label>
                  <textarea
                    name="jsonContent"
                    value={formData.jsonContent}
                    onChange={handleInputChange}
                    rows={20}
                    className="input-field font-mono text-sm"
                    placeholder="Enter your resume content in JSON format..."
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
                      Make this resume public
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
                      {formData.title || 'Untitled Resume'}
                    </h4>
                    <div className="text-sm text-gray-600">
                      <p>Resume content preview will be displayed here.</p>
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
                  Generate professional summary
                </button>
                <button className="w-full btn-secondary text-left">
                  Optimize for ATS
                </button>
                <button className="w-full btn-secondary text-left">
                  Suggest improvements
                </button>
                <button className="w-full btn-secondary text-left">
                  Check grammar & spelling
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

export default ResumeBuilderPage;
