# TODO

- Get Supabase correctly configured for 'profiles' and for the table to be autopopulated when users register
- Work on logic for premium subscription including Stripe integration
- Only show 'Free Trial' references when someone is on premium subscriptions and actively in the free trial period defined by Stripe subscription
- Define which scenarios are free and what are premium
- Work on logic to 'show' premium items but make sure they are inaccessible
- Build logic to give users a choice on subplots within each scenario or have a random feature
- Make logic to store choice in scenario database associated with user in Supabase
- Create hooks to send initial scenario prompt to langchain to start parsing the conversation
- Build logic to retrieve LLM results for conversation feedback card (analysis, rating scheme, key improvements to improve conversation)