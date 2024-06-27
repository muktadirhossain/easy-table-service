/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        disableStaticImages: false,
        minimumCacheTTL: 60,
        remotePatterns: [
          {
            protocol: "http",
            hostname: "localhost",
            port: "3000",
            pathname: "/**",
          },
          {
            protocol: "http",
            hostname: "38.242.233.232",
            port: "3535",
            pathname: "/**",
          },
        ],
      },
};

export default nextConfig;
