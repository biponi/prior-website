// src/app/store-location/page.tsx
import { MapPin } from "lucide-react";

const StoreLocations = () => {
  const title =
    "Store Locations | Luxury Online Mart - Everything your little one needs in one place";
  const metaDescription =
    "Visit our store locations in Dhanmondi and Wari for a wide selection of fashionable items. Find us at Genetic Plaza and Rankin Square.";
  const ogImage =
    "https://res.cloudinary.com/emerging-it/image/upload/v1726577358/nniy2n3ki3w1fqtxxy08.jpg";

  return (
    <>
      <head>
        <title>{title}</title>
        <meta name='description' content={metaDescription} />
        <meta
          property='og:title'
          content='Store Locations | Luxury Online Mart'
        />
        <meta property='og:description' content={metaDescription} />
        <meta property='og:image' content={ogImage} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://priorbd.com/store-locations' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={metaDescription} />
        <meta name='twitter:image' content={ogImage} />
      </head>
      <div className='min-h-[50vh] bg-gray-100 flex flex-col items-center justify-center py-12 px-4'>
        <h1 className='text-4xl font-bold text-gray-800 mb-8 text-center'>
          Our Store Locations
        </h1>
        <div className='grid md:grid-cols-2 gap-8 w-full max-w-7xl'>
          {/* Uttara Outlet */}
          <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col items-center'>
            <div className='text-center mb-4'>
              <MapPin
                className='w-8 h-8 text-gray-800 mx-auto mb-2'
                aria-hidden='true'
              />
              <h2 className='text-2xl font-semibold text-gray-900'>
                Uttara Outlet
              </h2>
              <p className='text-gray-600'>
                Shop 05, Uttara Square Shopping Complex, Beside Zam Zam Tower,
                Sector 13, Dhaka
              </p>
            </div>
            <iframe
              title='Uttara Outlet Location'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.435804447679!2d90.38606279999999!3d23.8741603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c56a9e5f2d79%3A0x77a4612ba106be5!2sUttara%20Square%20Shopping%20Mall!5e0!3m2!1sen!2sbd!4v1786189456735!5m2!1sen!2sbd'
              width='100%'
              height='300'
              style={{ border: 0 }}
              loading='lazy'
              allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreLocations;
