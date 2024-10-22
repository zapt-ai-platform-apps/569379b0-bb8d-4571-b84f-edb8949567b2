import IdeaGenerator from './IdeaGenerator';
import OpportunityList from './OpportunityList';

function HomePage() {
  return (
    <div class="h-full">
      <h1 class="text-4xl font-bold text-purple-600 mb-8">Discover Online Earning Opportunities</h1>
      <IdeaGenerator />
      <OpportunityList />
    </div>
  );
}

export default HomePage;