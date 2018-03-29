# Specs

Specs (we use [RSpec](http://rspec.info)) are crucial to building scalable applications. They not only help verify the implementation of our code and how new features interact with it, but also provide clear guidelines to our future selves about the expected behaviour of an application.

Clearly defined and well implemented specs will help us refactor with ease and
ship with confidence.

## Rspec and Rails

Rails applications typically have the following groupings of specs:

### Unit

Unit tests cover lower-level functionality of individual classes or methods.

  * [Controllers](controllers.md)
  * [Helpers](helpers.md)
  * [Models](models.md)
  * [Mailers](mailers.md)
  * [Services](services.md)
  * [Views](views.md)

### Integration

Integration tests are behavioural driven and in most cases will replicate the
expected experience from a 'first user' perspective. They help to decouple
behaviour from implementation, allowing for easier refactoring, and will ensure
that the individual components (units) of an application work well together.

  * [Features](features.md)
  * [Requests](requests.md)

## Recommendations

The following are key recommendations that will help to keep your specs
manageable and more enjoyable to code with as your application grows in size.

### Test in Four Phases

We typically try to structure each individual test into four phases:

  * setup
  * exercise
  * verify
  * teardown (most often handled by the test suite)

The overarching goal is to improve readability and consistency. By testing in
four phases, you should have everything you need to understand the logic
contained within the test.

A worked example is as follows:

```ruby
it 'sets a uuid for the customer' do
  # setup
  attrs = FactoryGirl.attributes_for(:customer)
  customer = Customer.new(attrs)

  # excercise
  customer.save

  # verify
  expect(customer.uuid).to_not be_nil
end
```

### Focus On Behaviour, Not Implementation

By focusing on the behaviour of your individual methods, or features, your test suite becomes much more robust and will offer two key advantages:

  * Tests are less brittle as they are decoupled from implementation
  * Refactoring is quicker and you will have a greater level of confidence the
    expected behaviour of the app has not changed

### Use let With Great Caution

  * [Let's Talk About This](https://dvelp.co.uk/articles/lets-talk-about-this)
  * [Let's Not](https://robots.thoughtbot.com/lets-not)
  * [My Issues With Let](https://robots.thoughtbot.com/my-issues-with-let)

## References

There are many, many articles and theories about how and what to test. The
templates above are a very high-level examples of how we would approach our
test-suite, but I highly recommend a read of the following:

  * [Better Specs](http://www.betterspecs.org/)
  * [The Illusion of TDD](http://dncrht.github.io/2017/03/17/the-illusion-of-tdd.html)
  * [TDD is Dead. Long Live Testing.](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html)

