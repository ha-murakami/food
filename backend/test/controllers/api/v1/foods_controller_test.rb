require "test_helper"

class Api::V1::FoodsControllerTest < ActionDispatch::IntegrationTest
  test "should search by name" do
    get api_v1_foods_url, params: { name: "Ramen" }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal 1, json_response.length
    assert_equal "Ramen", json_response.first["name"]
  end

  test "should search by description" do
    get api_v1_foods_url, params: { search: "Delicious" }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal 1, json_response.length
    assert_equal "Ramen", json_response.first["name"]
  end

  test "should search by full_description" do
    get api_v1_foods_url, params: { search: "Tokyo" }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal 1, json_response.length
    assert_equal "Ramen", json_response.first["name"]
  end
end
