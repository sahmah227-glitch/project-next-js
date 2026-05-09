// Mock Auth Service — supports role field for seller/customer

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(email, password) {
    await delay(900);
    // Detect seller accounts by email prefix for demo
    const isSeller = email.includes('seller') || email.includes('shop');
    return {
      user: {
        id: Math.floor(Math.random() * 9000) + 1000,
        name: (email.split('@')[0] || 'User')
          .replace(/[._-]/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase()),
        email,
        role: isSeller ? 'seller' : 'customer',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=6366f1&color=fff`,
      },
      token: 'mock-jwt-' + Math.random().toString(36).substring(2, 10),
    };
  },

  async register(name, email, password, role = 'customer') {
    await delay(900);
    return {
      user: {
        id: Math.floor(Math.random() * 9000) + 1000,
        name,
        email,
        role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`,
      },
      token: 'mock-jwt-' + Math.random().toString(36).substring(2, 10),
    };
  },
};
