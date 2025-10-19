"use client";

import { useState } from "react";
import { FaEnvelope, FaEye, FaTrash, FaCheck, FaSearch } from "react-icons/fa";
import AdminLayout from "@/components/admin/AdminLayout";
import { useContactMessages } from "@/hooks/useContactMessages";
import { ContactMessage } from "@/hooks/useContactMessages";

export default function AdminContactMessages() {
  const { 
    messages, 
    loading, 
    error, 
    refetch, 
    markAsRead, 
    markAllAsRead, 
    deleteMessage, 
    isRealtimeActive 
  } = useContactMessages();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRead, setFilterRead] = useState<"all" | "read" | "unread">("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Filter messages based on search and read status
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      filterRead === "all" || 
      (filterRead === "read" && message.is_read) ||
      (filterRead === "unread" && !message.is_read);

    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(msg => !msg.is_read).length;

  const handleMarkAsRead = async (messageId: string) => {
    await markAsRead(messageId);
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await deleteMessage(messageId);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (confirm("Mark all messages as read?")) {
      await markAllAsRead();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AdminLayout
      title="Contact Messages"
      subtitle={`${messages.length} total messages • ${unreadCount} unread`}
      showRealtimeStatus={true}
      isRealtimeActive={isRealtimeActive}
      onRefresh={refetch}
      additionalActions={
        <div className="flex gap-2">
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <FaCheck className="text-sm" />
            Mark All Read
          </button>
        </div>
      }
    >
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700]"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-[#FFD700] text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterRead}
                  onChange={(e) => setFilterRead(e.target.value as "all" | "read" | "unread")}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                >
                  <option value="all">All Messages</option>
                  <option value="unread">Unread Only</option>
                  <option value="read">Read Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Messages List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <FaEnvelope className="mx-auto text-4xl text-gray-400 mb-4" />
                <p className="text-gray-600">No messages found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-6 hover:bg-gray-50 transition-colors ${
                      !message.is_read ? "bg-blue-50 border-l-4 border-blue-400" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {message.subject}
                          </h3>
                          {!message.is_read && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="font-medium">{message.name}</span>
                          <span>{message.email}</span>
                          <span>{formatDate(message.created_at)}</span>
                        </div>
                        <p className="text-gray-700 line-clamp-2">
                          {message.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => setSelectedMessage(message)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="View full message"
                        >
                          <FaEye />
                        </button>
                        {!message.is_read && (
                          <button
                            onClick={() => handleMarkAsRead(message.id)}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            title="Mark as read"
                          >
                            <FaCheck />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete message"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedMessage.subject}
                </h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">From</label>
                  <p className="text-gray-900">{selectedMessage.name} ({selectedMessage.email})</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <p className="text-gray-900">{formatDate(selectedMessage.created_at)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Message</label>
                  <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              {!selectedMessage.is_read && (
                <button
                  onClick={() => {
                    handleMarkAsRead(selectedMessage.id);
                    setSelectedMessage(null);
                  }}
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
