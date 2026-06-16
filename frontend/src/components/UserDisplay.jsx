import Axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import BACKEND_BASE_URL from '../../api/api';

const tabs = [
  { key: 'all', label: 'All Users' },
  { key: 'admin', label: 'Admins' },
  { key: 'customer', label: 'Customers' },
];

const summaryCards = [
  { key: 'total', label: 'Total Users', tone: 'bg-orange-50 text-orange-600 border-orange-100' },
  { key: 'admin', label: 'Admins', tone: 'bg-amber-50 text-amber-600 border-amber-100' },
  { key: 'customer', label: 'Customers', tone: 'bg-rose-50 text-rose-600 border-rose-100' },
  { key: 'recent', label: 'Recent Signups', tone: 'bg-slate-50 text-slate-700 border-slate-200' },
];

const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (!parts.length) {
    return 'U';
  }

  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() || '').join('');
};

const formatDate = (value) => {
  if (!value) {
    return '-';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const formatTimeAgo = (value) => {
  if (!value) {
    return '-';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  const diffMinutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
  if (diffMinutes < 1) {
    return 'Just now';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

const UserDisplay = () => {
  const [userData, setUserData] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const userFetch = async () => {
      try {
        const response = await Axios.get(`${BACKEND_BASE_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setUserData(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.log('error is:', err);
      }
    };

    userFetch();
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return userData.filter((user) => {
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'admin' && user.isAdmin) ||
        (activeTab === 'customer' && !user.isAdmin);

      if (!matchesTab) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const haystack = [user._id, user.name, user.email, user.isAdmin ? 'admin' : 'customer']
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [activeTab, searchTerm, userData]);

  const stats = useMemo(() => {
    const total = userData.length;
    const admin = userData.filter((user) => user.isAdmin).length;
    const customer = total - admin;
    const recent = userData.filter((user) => {
      if (!user.createdAt) {
        return false;
      }

      const createdAt = new Date(user.createdAt);
      if (Number.isNaN(createdAt.getTime())) {
        return false;
      }

      const diffHours = (Date.now() - createdAt.getTime()) / 36e5;
      return diffHours <= 24;
    }).length;

    return { total, admin, customer, recent };
  }, [userData]);

  const summaryValues = [stats.total, stats.admin, stats.customer, stats.recent];

  return (
    <div className="w-full px-1 py-4 text-slate-900">
      <div className="mb-5 flex flex-col gap-4 rounded-[28px] border border-orange-100 bg-white/95 p-5 shadow-none lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">User Management</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Customers and admins</h2>
          <p className="mt-1 text-sm text-slate-500">Review platform users, roles, and recent registrations.</p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
            <i className="fa-solid fa-users text-lg" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">Visible users</p>
            <p className="text-2xl font-semibold text-slate-900">{filteredUsers.length.toString().padStart(2, '0')}</p>
          </div>
        </div>
      </div>

      <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card, index) => (
          <div
            key={card.key}
            className="rounded-[24px] border border-slate-200 bg-white px-5 py-4 shadow-none"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{summaryValues[index].toString().padStart(2, '0')}</p>
              </div>
              <div className={`rounded-2xl border px-3 py-2 text-sm font-semibold ${card.tone}`}>
                <i className="fa-solid fa-user" aria-hidden="true" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-none sm:p-6">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-orange-100 p-1">
              {tabs.map((tab) => {
                const active = activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${active
                      ? 'bg-white text-orange-600 shadow-none'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex min-w-[240px] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <i className="fa-solid fa-magnifying-glass text-slate-400" aria-hidden="true" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search users..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-none transition hover:bg-orange-600"
            >
              <i className="fa-solid fa-plus" aria-hidden="true" />
              Add User
            </button>

            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-orange-200 hover:text-orange-600"
            >
              <i className="fa-solid fa-ellipsis-vertical" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-[24px] border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-5 py-4">Customer ID</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Join Date</th>
                  <th className="px-5 py-4 text-right">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredUsers.length ? (
                  filteredUsers.map((user, index) => {
                    const isAdmin = Boolean(user.isAdmin);
                    const statusTone = isAdmin
                      ? 'bg-amber-50 text-amber-700 border-amber-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-100';

                    return (
                      <tr key={user._id || index} className="transition hover:bg-orange-50/40">
                        <td className="whitespace-nowrap px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border text-sm font-semibold ${isAdmin
                              ? 'border-amber-100 bg-amber-50 text-amber-600'
                              : 'border-orange-100 bg-orange-50 text-orange-600'
                              }`}>
                              {getInitials(user.name)}
                            </div>
                            <span className="font-medium text-slate-900">{user._id}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">{user.name}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{user.email}</td>
                        <td className="whitespace-nowrap px-5 py-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${isAdmin
                              ? 'border-amber-100 bg-amber-50 text-amber-700'
                              : 'border-orange-100 bg-orange-50 text-orange-700'
                              }`}
                          >
                            {isAdmin ? 'Admin' : 'Customer'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                          <div>{formatDate(user.createdAt)}</div>
                          <div className="text-xs text-slate-400">{formatTimeAgo(user.createdAt)}</div>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right">
                          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusTone}`}>
                            Active
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-orange-200 hover:text-orange-600"
                              aria-label={`Message ${user.name || 'customer'}`}
                            >
                              <i className="fa-solid fa-message" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:text-red-600"
                              aria-label={`Delete ${user.name || 'customer'}`}
                            >
                              <i className="fa-solid fa-trash" aria-hidden="true" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="px-5 py-16 text-center text-sm text-slate-500" colSpan={6}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDisplay;
