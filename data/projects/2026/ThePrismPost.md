### Preserving Human's Critical Reasoning Project
- Identified that advances in AI have also fueled fake news and scams, making it harder for people to maintain an objective perspective.
- Built a news platform that reads various articles, groups those covering the same event, and shows each article's specific perspective on it.
- Conducted a fake door test and found that 8% of users who visited our fake door page left their email for early access.
- Cut the daily news-clustering pipeline's runtime from about 10 hours to about 1.5 hours (~85% reduction).
  - Parallelized per-article processing (summarization, claim extraction, axis classification) accross 8 concurrent workers.
  - Minimized network calls in entity resolution by resolving against a registry first, then a Wikidata cache, and hitting the Wikidata API.
- Recognize that it's difficult to compete with big tech companies' algorithms and steer users toward objective perspectives rather than their preferences. Still working on it because it's necessary, even if not monetizable.