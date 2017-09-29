# Helper Specs

With helpers being modules, their associated specs are typically low-level unit
tests on the individual methods within.

Example:

```ruby
require 'rails_helper'

RSpec.describe CustomersHelper, type: :helper do
  describe '#full_name(customer)' do
    context 'customer has a middle name' do
      it 'returns first middle and last names' do
        customer = FactoryGirl.build_stubbed(
          :customer,
          first_name: 'Tom',
          middle_name: 'Ruby',
          last_name: 'Mullen'
        )

        result = helper.full_name(customer)

        expect(result).to eq('Tom Ruby Mullen')
      end
    end

    context 'customer does not have a middle name' do
      it 'returns first and last names' do
        customer = FactoryGirl.build_stubbed(
          :customer,
          first_name: 'Tom',
          last_name: 'Mullen'
        )

        result = helper.full_name(customer)

        expect(result).to eq('Tom Mullen')
      end
    end
  end
end
```
