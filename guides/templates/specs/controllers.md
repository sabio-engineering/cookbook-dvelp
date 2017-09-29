# Controller Specs

Rails 5 saw the deprecation of commonly used helper methods `assigns` and
`assert_template`. It was deemed, and rightly so, that these methods lead to
brittle tests that care too much about implementation details.

Why should a test care that a specific instance variable was created or that a
specific action file is responsible for the output of an action? In short, they
shouldn't.

The focus, upon advice from both Rails core and RSpec teams, has therefore
shifted to more robust integration tests.

You can read this [request specs guide](requests.mb) for a worked example.

