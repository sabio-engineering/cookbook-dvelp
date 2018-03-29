# Request Specs

Request specs provide a thin wrapper around integration specs and are aimed at
improving behavioural driven testing. By focusing on the inputs (inbound
request) and outputs (end result), we can decouple the behviour of the
application from our implementation.

It is advised to stub as little as possible when writing your specs in order to
replicate the user experience as closely as you can.

The following is an example of how a request spec can help achieve that:

```ruby
require 'rails_helper'

describe 'Updating a customer', type: :request do
  context 'customer is not authenticated' do
    it "denies access to customers#update" do
      customer = FactoryGirl.create(:customer)
      customer_attributes = { name: 'Tom' }

      expect {
        patch "/customers/#{customer.id}", { customer: customer_attributes }
      }.to_not change { customer.reload.name }

      expect(response).to redirect_to login_url
    end
  end

  context 'customer is authenticated' do
    it "allows access to customers#update" do
      customer = FactoryGirl.create(:customer)
      customer_attributes = { name: 'Bob' }

      authenticate(customer)

      expect {
        patch "/customers/#{customer.id}", { customer: customer_attributes }
      }.to change { customer.reload.name }

      expect(response).to redirect_to customer_url(customer)
    end
  end
end
```
