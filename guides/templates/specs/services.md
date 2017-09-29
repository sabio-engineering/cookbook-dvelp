# Service Specs

For each service, we would typically test it's public methods for expected
behaviour, much like any other class.

Example:

```ruby
require 'rails_helper'

RSpec.describe Customers::Creator do
  describe '#create' do
    it 'returns a customer object' do
      creator = described_class.new(params: customer_attributes)

      result = creator.create

      expected(result).to be_a(Customer)
    end

    context 'attributes are valid' do
      it 'creates a customer' do
        customer_attributes = FactoryGirl.attributes_for(:customer)
        creator = described_class.new(params: customer_attributes)

        expect { creator.create }
          .to change { Customer.count }
      end

      it 'sends a welcome email' do
        customer_attributes = FactoryGirl.attributes_for(:customer)
        creator = described_class.new(params: customer_attributes)

        allow(CustomerMailer).to receive(:welcome).and_call_original

        creator.create

        expect(CustomerMailer).to have_received(:welcome)
          .with(Customer.last)
      end
    end

    context 'attributes are invalid' do
      it 'creates a customer' do
        customer_attributes = {}
        creator = described_class.new(params: customer_attributes)

        expect { creator.create }
          .to change { Customer.count }
      end
    end
  end
end
```

