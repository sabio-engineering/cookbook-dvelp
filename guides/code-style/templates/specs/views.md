# View Specs

We don't tend to use view specs as regularly for the following reasons:

  * Behaviour is covered by feature specs
  * Views should only contain basic logic
  * Views are implementation detail

For those views where we do write specs, they would typically look like this:

```ruby
require 'rails_helper'

describe 'customers/show.html.slim' do
  it 'displays the customer name' do
    customer = build_stubbed(:customer)
    assign(:customer, customer)

    render

    rendered.should contain('Tom Mullen')
  end
end
```
