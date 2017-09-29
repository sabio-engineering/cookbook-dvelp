# Model Specs

ActiveRecord makes up the single largest part of the Rails framework, so it
stands to reason that your model specs can have many components covering
associations, delegations, scopes, validations etc.

To help wrangle model specs and focus on the 'value add' more quickly, we
recommend the following libraries:

  * [Shoulda Callback Matchers](https://github.com/jdliss/shoulda-callback-matchers)
  * [Shoulda Matchers](https://github.com/thoughtbot/shoulda-matchers)
  * [Test After Commit](https://github.com/grosser/test_after_commit)

An example of a typical model spec at DVELP looks like this:

```ruby
require 'rails_helper'

describe Customer, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:company) }
    it { is_expected.to have_many(:orders) }
    it { is_expected.to have_one(:address) }
  end

  describe 'callbacks' do
    it { is_expected.to callback(:parse_name).before(:validation) }
  end

  describe 'delegates' do
    it { is_expected.to delegate_method(:post_code).to(:address) }
  end

  describe 'nested attributes' do
    it { is_expected.to accept_nested_attributes_for(:orders) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:company) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email) }
    it { is_expected.to validate_presence_of(:first_name) }
    it { is_expected.to validate_presence_of(:last_name) }
  end

  describe '.is_active' do
    it 'returns active customers' do
      active_customer = FactoryGirl.create(:customer, active: true)
      _inactive_customer = FactoryGirl.create(:customer, active: false)

      result = described_class.is_active

      expect(result).to match_array([active_customer])
    end
  end

  describe '.activate' do
    it 'marks all records as active' do
      inactive_customer = FactoryGirl.create(:customer, active: false)

      expect { Customer.activate }
        .to change { inactive_customer.reload.active }
    end
  end

  describe '#full_name' do
    it 'is returns the customers full name' do
      customer = FactoryGirl.build_stubbed(
        :customer,
        first_name: 'Tom',
        last_name: 'Mullen'
      )

      result = customer.full_name

      expect(result).to eq('Tom Mullen')
    end
  end
end
```
