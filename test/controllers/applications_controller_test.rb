require "test_helper"

class ApplicationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @application = applications(:one)
  end

  test "should get index" do
    get applications_url, as: :json, headers: auth_headers
    assert_response :success
  end

  test "should create application" do
    assert_difference("Application.count") do
      post applications_url, params: { application: { motivation: @application.motivation } }, as: :json, headers: auth_headers
    end

    assert_response :created
  end

  test "should show application" do
    get application_url(@application), as: :json, headers: auth_headers
    assert_response :success
  end

  test "should update application" do
    patch application_url(@application), params: { application: { motivation: @application.motivation } }, as: :json, headers: auth_headers
    assert_response :success
  end

  test "should destroy application" do
    assert_difference("Application.count", -1) do
      delete application_url(@application), as: :json, headers: auth_headers
    end

    assert_response :no_content
  end
end