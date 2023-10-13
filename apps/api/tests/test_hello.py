"""Hello unit test module."""

from api.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello api"
