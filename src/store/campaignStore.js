import { createSignal } from 'solid-js';

let campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');

export const fetchCampaigns = async () => {
  // Simulate API call
  return campaigns;
};

export const saveCampaign = async (campaign) => {
  // Simulate API call
  campaigns.push(campaign);
  localStorage.setItem('campaigns', JSON.stringify(campaigns));
};

export const deleteCampaign = async (id) => {
  campaigns = campaigns.filter((campaign) => campaign.id !== id);
  localStorage.setItem('campaigns', JSON.stringify(campaigns));
};

export const getCampaignById = async (id) => {
  return campaigns.find((campaign) => campaign.id === id);
};