import React from 'react';
import { Menu, Bell, Calendar, ChevronDown, HelpCircle } from 'lucide-react';
import './Header.css';

export default function Header({ role = 'admin' }) {
  const isPM = role === 'pm';
  const isSE = role === 'se';
  const isPO = role === 'po';
  const isAccounts = role === 'accounts';
  const isSales = role === 'sales';

  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-btn menu-btn">
          <Menu size={20} />
        </button>
        {isSE && (
          <div className="se-site-selector">
            <span>Project A / Site 01</span>
            <ChevronDown size={16} />
          </div>
        )}
        {isPO && (
          <div className="po-header-title">
            Procurement Dashboard
          </div>
        )}
        {isAccounts && (
          <div className="po-header-title">
            Accounts Dashboard
          </div>
        )}
        {isSales && (
          <div className="po-header-title">
            Sales Dashboard
          </div>
        )}
      </div>
      
      <div className="header-right">
        {(isPO || isAccounts || isSales) && (
          <div className="po-date-picker">
            <Calendar size={16} />
            <span>01 Sep 2024 - 07 Sep 2024</span>
            <ChevronDown size={16} />
          </div>
        )}
        
        <div className="notification-wrapper">
          <button className="icon-btn">
            <Bell size={20} />
          </button>
          <span className={`notification-badge ${isPM || isSE || isPO || isAccounts || isSales ? 'red-badge' : ''}`}>
            {isSE ? '3' : (isPO || isSales) ? '4' : isAccounts ? '5' : isPM ? '6' : '12'}
          </span>
        </div>
        
        {isPO && (
          <button className="icon-btn">
            <HelpCircle size={20} />
          </button>
        )}

        {(isPM || isAccounts) && (
          <button className="icon-btn">
            <Calendar size={20} />
          </button>
        )}
        
        <div className="user-profile">
          {isSE ? (
            <div className="avatar pm-avatar bg-slate">SE</div>
          ) : isPM ? (
            <div className="avatar pm-avatar">RM</div>
          ) : isPO ? (
            <div className="avatar pm-avatar bg-purple-solid">PR</div>
          ) : isAccounts ? (
            <div className="avatar pm-avatar bg-purple-solid">AC</div>
          ) : isSales ? (
            <div className="avatar pm-avatar bg-purple-solid">RS</div>
          ) : (
            <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff&rounded=true" alt="User Avatar" className="avatar" />
          )}
          <div className="user-info">
            <span className="user-name">{isSE ? 'XYZ' : isPM ? 'Rahul Mehta' : isPO ? 'Priya Rao' : isAccounts ? 'Anjali Chauhan' : isSales ? 'Riya Sharma' : 'Admin'}</span>
            <span className="user-role">{isSE ? 'Site Engineer' : isPM ? 'Project Manager' : isPO ? 'Procurement Officer' : isAccounts ? 'Accounts Executive' : isSales ? 'Sales Executive' : 'System Administrator'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
