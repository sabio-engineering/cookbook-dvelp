# Mailer Specs

Mailer specs are often very terse and we focus on ensuring the following are as
expected:

  * Subject line
  * From
  * To
  * Body

```ruby
require 'rails_helper'

RSpec.describe CustomerMailer, type: :mailer do
  describe 'welcome' do
    let(:mail) { CustomerMailer.welcome }

    it 'renders the headers' do
      expect(mail.subject).to eq('Welcome')
      expect(mail.to).to eq(['customer@dvelp.co.uk'])
      expect(mail.from).to eq(['team@dvelp.co.uk'])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match('Hi')
    end
  end
end
```
