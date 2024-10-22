export const fetchAnalyticsData = async () => {
  // Simulate fetching analytics data
  // Generate random data for demonstration
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = labels.map(() => Math.floor(Math.random() * 100));

  return { labels, values };
};