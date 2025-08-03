const fs = require("fs");
const inputFilePath = "./generated/catanduanes.json"; // Path to the input JSON file containing business data
const outputFilePath = "./generated/catanduanes_0.json"; // Output file path for the mapped businesses
/**
 * Mapping script for businesses
 * This script reads a JSON file containing business data, maps specific fields to boolean values,
 * and writes the result to a new JSON file named "mapped_businesses.json".
 *
 * Ensure you have the 'fs' module available in your Node.js environment.
 */

function mapBusinesses() {
  try {
    const data = fs.readFileSync(inputFilePath, "utf8");
    const businesses = JSON.parse(data);
    const mappedBusinesses = businesses.map((business) => {
      business.keywords =
        business.keywords && business.keywords.length > 0
          ? business.keywords
              .map((keyword) => keyword.toLowerCase().trim())
              .concat(business.business_category.toLowerCase().trim())
          : [
              business.keywords?.toLowerCase()?.trim(),
              business.business_category?.toLowerCase()?.trim(),
            ].filter(Boolean);
      business.keywords = Array.from(new Set(business.keywords)); // Remove duplicates

      business = {
        id: business.FSID,
        business_name: business.business_name,
        business_category: business.business_category,
        business_nature_of_business: business.nature_of_business,
        business_description: business.business_description,
        address_google_maps: business.google_maps_url,
        address_long: business.long_address,
        address_street: business.street_address,
        address_city: business.city,
        address_province: business.province,
        contact_email: business.email,
        contact_phone: business.phone,
        contact_website: business.website,
        contact_facebook: business.facebook_url,
        contact_instagram: business.instagram,
        misc_modes_of_payment: business.modes_of_payment,
        misc_operating_hours: business.operating_hours,
        misc_keywords: business.keywords,
        misc_wifi_avaibility: business.wifi_availability,
        misc_communication_channels: business.communication_channels,
        misc_is_reservation_required: business.require_reservation,
        misc_pricing: business.pricing,
        misc_parking: business.parking,
        meta_created_at: business.created_at || new Date().toISOString(),
        meta_updated_at: business.updated_at || new Date().toISOString(),
        meta_is_active:
          business.is_active !== undefined ? business.is_active : true, // Default to true if not specified
        meta_is_business_verified:
          business.is_business_verified !== undefined
            ? business.is_business_verified
            : false, // Default to false if not specified
      };

      return business;
    });
    fs.writeFileSync(outputFilePath, JSON.stringify(mappedBusinesses, null, 2));
    console.log("Mapped businesses have been written to", outputFilePath);
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
  }
}

mapBusinesses();
