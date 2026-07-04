import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  ShoppingBag, 
  Bell, 
  ChevronRight, 
  Download, 
  Trash2, 
  ArrowLeft,
  CheckCircle2,
  Utensils
} from 'lucide-react';
import './App.css';

function App() {
  const [showConsentModal, setShowConsentModal] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Settings State
  const [settings, setSettings] = useState({
    location: true,
    orderHistory: true,
    marketing: false,
    personalization: true
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
    showToastMessage(`${formattedKey} setting updated`);
  };

  const showToastMessage = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const acceptConsent = () => {
    setShowConsentModal(false);
    showToastMessage('Privacy settings saved securely');
  };

  return (
    <div className="app-container">
      <div className="mobile-frame">
        {/* Header */}
        <div className="app-header">
          <button className="back-button">
            <ArrowLeft size={24} />
          </button>
          <div className="header-title" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginRight: '40px'}}>
             <span style={{fontStyle: 'italic', fontWeight: 900, color: 'var(--zomato-red)', fontSize: '1.5rem', letterSpacing: '-0.5px'}}>zomato</span>
             <span style={{fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-secondary)'}}>| Privacy</span>
          </div>
        </div>

        {/* Content */}
        <div className="app-content">
          <p className="text-secondary mb-6 text-sm">
            Manage your personal data and privacy settings in accordance with the DPDP Act 2023. You have full control over what you share.
          </p>

          <h2 className="section-title">Data Permissions</h2>
          <div className="settings-group mb-6">
            <div className="setting-row">
              <div className="setting-info">
                <div className="setting-icon"><MapPin size={20} /></div>
                <div className="setting-text">
                  <h4>Location Data</h4>
                  <p>Used to find nearby restaurants & deliver</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={settings.location} onChange={() => handleToggle('location')} />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="setting-row">
              <div className="setting-info">
                <div className="setting-icon"><Utensils size={20} /></div>
                <div className="setting-text">
                  <h4>Personalized Recommendations</h4>
                  <p>Uses order history for better suggestions</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={settings.personalization} onChange={() => handleToggle('personalization')} />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-row">
              <div className="setting-info">
                <div className="setting-icon"><Bell size={20} /></div>
                <div className="setting-text">
                  <h4>Marketing & Promos</h4>
                  <p>Receive SMS/Email offers</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={settings.marketing} onChange={() => handleToggle('marketing')} />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <h2 className="section-title">Your Data Rights</h2>
          <div className="settings-group mb-6">
            <div className="setting-row action-row" onClick={() => showToastMessage('Download request initiated. You will receive an email shortly.')}>
              <div className="setting-info">
                <div className="setting-icon"><Download size={20} /></div>
                <div className="setting-text">
                  <h4>Request My Data</h4>
                  <p>Get a copy of your personal data</p>
                </div>
              </div>
              <ChevronRight className="setting-action" size={20} />
            </div>
            
            <div className="setting-row action-row danger-action" onClick={() => showToastMessage('Deletion process started. This takes 72 hours.')}>
              <div className="setting-info">
                <div className="setting-icon"><Trash2 size={20} /></div>
                <div className="setting-text">
                  <h4>Delete Order History</h4>
                  <p>Remove past orders (retained for tax purposes)</p>
                </div>
              </div>
              <ChevronRight className="setting-action" size={20} />
            </div>
          </div>
        </div>

        {/* Consent Modal Overlay */}
        {showConsentModal && (
          <div className="modal-overlay animate-fade-in">
            <div className="modal-content animate-fade-in delay-100">
              <div className="consent-header">
                <div style={{fontStyle: 'italic', fontWeight: 900, color: 'var(--zomato-red)', fontSize: '2.5rem', letterSpacing: '-1px', marginBottom: '1.5rem'}}>zomato</div>
                <div className="icon-wrapper">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-xl font-bold mb-2">We updated our Privacy Policy</h2>
                <p className="text-secondary text-sm">
                  To comply with India's DPDP Act, we are giving you more control over your data. Review your settings below.
                </p>
              </div>

              <div className="consent-list">
                <div className="consent-item">
                  <MapPin className="consent-item-icon" size={20} />
                  <div className="consent-item-content">
                    <h4 className="consent-item-title">Location & Delivery (Essential)</h4>
                    <p className="consent-item-desc">Required to show restaurants and deliver food to your address.</p>
                  </div>
                </div>
                
                <div className="consent-item">
                  <ShoppingBag className="consent-item-icon" size={20} />
                  <div className="consent-item-content">
                    <div className="flex justify-between items-center">
                      <h4 className="consent-item-title">Personalization</h4>
                      <label className="toggle-switch">
                        <input type="checkbox" checked={settings.personalization} onChange={() => handleToggle('personalization')} />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <p className="consent-item-desc mt-1">We use your order history to suggest new places you might love.</p>
                  </div>
                </div>
              </div>

              <button className="btn-primary w-full mt-4" style={{padding: '1rem', fontSize: '1.125rem'}} onClick={acceptConsent}>
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="toast-container">
            <div className="toast animate-fade-in">
              <CheckCircle2 size={18} style={{color: '#10B981', flexShrink: 0}} />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
