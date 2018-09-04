# Feature Specs

We leverage feature specs to mimic the 'first user' of our application in an
environment with as little stubbing as is possible.

The specs will run through primary customer 'flows' to ensure that all the
components of our app work well together and, most importantly, the consumer
experiences the expected behaviour.

Feature specs differ from unit specs, in that individual specs may have
multiple expectations.

An example of a feature spec is as follows:

```ruby
require 'rails_helper'

RSpec.feature 'subscribing to a the newsletter', js: true do
  before(:each) do
    ENV['MAILCHIMP_API_KEY'] = 'abc-def'
    ENV['MAILCHIMP_LIST_ID'] = '123'
  end

  context 'email is valid' do
    it 'subscribes the customer' do
      visit root_path

      fill_in 'newsletter_subscriber_email', with: 'tom@dvelp.co.uk'
      click_button 'Subscribe'

      expect(page).to have_content("You're in!")
    end
  end

  context 'email is invalid' do
    it 'does NOT subscribe the customer' do
      visit root_path

      fill_in 'newsletter_subscriber_email', with: 'tom-dvelp.co.uk'
      click_button 'Subscribe'

      expect(page).to have_content('Houston, we have a problem.')
    end
  end
end
```
