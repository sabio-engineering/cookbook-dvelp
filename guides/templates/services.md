# Services

As our applications grow in size we often find our ActiveRecord objects
getting increasingly bloated, containing more and more business logic that doesn't really belong. We have already committed to skinny controllers, so we turn to services for help.

The following is a collection of services that will help manage the lifecycle of
an `Order` object.

## Key Points

  * Put services in the `app/services/` directory

  * Don't call services services e.g. `order_service.rb`. It's in the services
    directory, we know it's a service

  * When creating services for ActiveRecord objects, create folders with the
    plural form of the name e.g. `app/services/orders/`

## Template

```ruby
# app/services/orders/creator.rb
module Orders
  class Creator
    def initialize(params: {})
      self.params = params
    end

    def create
      order = Order.new(params)
      if order.save
        take_payment(order)
        send_email(order)
      end

      order
    end

    private

    attr_accessor :params

    def take_payment(order)
      Payments::Creator.new(order: order).create
    end

    def send_email(order)
      OrderMailer.confirmation(order).deliver_now
    end
  end
end

# app/services/orders/updater.rb
module Orders
  class Updator
    def initialize(order:, params: {})
      self.order = order
      self.params = params
    end

    def update
      result = order.update_attributes(params)

      if order.cancelled?
        process_refund
        send_cancellation_email
      end

      result
    end

    private

    attr_accessor :order, :params

    def process_refund
    end

    def send_cancellation_email
      OrderMailer.cancellation(order).deliver_now
    end
  end
end
```
