# frozen_string_literal: true

require "jwt"
require "net/http"

class Auth0Client
  # Auth0 Client Objects
  Error = Struct.new(:message, :status)
  Response = Struct.new(:decoded_token, :error)

  # Helper Functions
  def self.domain_url
    # "https://#{Rails.configuration.auth0.domain}/"
    "https://dev-x06xx52q.us.auth0.com/"
  end

  def self.decode_token(token, jwks_hash)
    JWT.decode(token, nil, true, {
                 algorithm: "RS256",
                 iss: domain_url,
                 verify_iss: true,
                 aud: "https://hackaton.elflargo.com/", # Rails.configuration.auth0.audience,
                 verify_aud: true,
                 jwks: { keys: jwks_hash[:keys] }
               })
  end

  def self.get_jwks
    jwks_uri = URI("#{domain_url}.well-known/jwks.json")
    Net::HTTP.get_response jwks_uri
  end

  # Token Validation
  def self.validate_token(token)
    jwks_response = get_jwks

    unless jwks_response.is_a? Net::HTTPSuccess
      error = Error.new(message: "Unable to verify credentials", status: :internal_server_error)
      return Response.new(nil, error)
    end

    jwks_hash = JSON.parse(jwks_response.body).deep_symbolize_keys

    decoded_token = decode_token(token, jwks_hash)

    Response.new(decoded_token, nil)
  rescue JWT::VerificationError, JWT::DecodeError => e
    error = Error.new("Bad credentials", :unauthorized)
    Response.new(nil, error)
  end
end
