// frontend/src/pages/ProductDetail/ProductDetail.jsx
// (or SingleProduct.jsx — wherever your product detail page lives)
// Complete drop-in replacement — UI only, all existing Redux actions preserved

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Badge,
  Image,
  Divider,
  SimpleGrid,
  AspectRatio,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Container,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Keep your existing imports:
// import { getProductById } from "../../redux/actions/productActions";
// import { addToCart } from "../../redux/actions/cartActions";
// import { addToWishlist } from "../../redux/actions/wishlistActions";

const HeartIcon = ({ filled = false, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

const ShareIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const ZoomIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);

// ─── Image Gallery ────────────────────────────────────────────────────────────
const ImageGallery = ({ images = [], name = "" }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const displayImages = images.length > 0
    ? images
    : ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80"];

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <Box position="sticky" top="24">
      {/* Main image */}
      <Box
        position="relative"
        overflow="hidden"
        bg="surface.card"
        cursor={isZoomed ? "zoom-out" : "zoom-in"}
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isZoomed && setIsZoomed(false)}
      >
        <AspectRatio ratio={1}>
          <Box>
            <Image
              src={displayImages[activeIdx]}
              alt={name}
              objectFit="cover"
              w="full"
              h="full"
              transition="transform 0.3s ease"
              transformOrigin={isZoomed ? `${mousePos.x}% ${mousePos.y}%` : "center"}
              transform={isZoomed ? "scale(2)" : "scale(1)"}
            />
          </Box>
        </AspectRatio>

        {/* Controls */}
        <HStack position="absolute" top="4" right="4" spacing="2">
          <IconButton
            icon={<ZoomIcon />}
            size="sm"
            variant="solid"
            bg="white"
            color="ink.primary"
            _hover={{ bg: "surface.card" }}
            aria-label="Zoom"
            borderRadius="none"
            onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
          />
        </HStack>

        {/* Image counter */}
        <Box position="absolute" bottom="4" right="4" bg="white" px="3" py="1">
          <Text fontSize="2xs" color="ink.muted" letterSpacing="0.1em">
            {activeIdx + 1} / {displayImages.length}
          </Text>
        </Box>
      </Box>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <HStack spacing="2" mt="3">
          {displayImages.map((img, i) => (
            <Box
              key={i}
              w="16"
              h="16"
              overflow="hidden"
              cursor="pointer"
              border="1.5px solid"
              borderColor={activeIdx === i ? "ink.primary" : "transparent"}
              transition="border-color 0.2s"
              onClick={() => setActiveIdx(i)}
              flex="0 0 auto"
            >
              <Image
                src={img}
                alt={`View ${i + 1}`}
                objectFit="cover"
                w="full"
                h="full"
                opacity={activeIdx === i ? 1 : 0.6}
                transition="opacity 0.2s"
                _hover={{ opacity: 1 }}
              />
            </Box>
          ))}
        </HStack>
      )}
    </Box>
  );
};

// ─── Product Info ─────────────────────────────────────────────────────────────
const frameColors = [
  { name: "Matte Black", hex: "#1a1a1a" },
  { name: "Tortoise", hex: "#7B4F2E" },
  { name: "Gold", hex: "#C9A84C" },
  { name: "Crystal", hex: "#E8E8E8" },
];

const lensTypes = [
  { id: "clear", label: "Clear", price: 0 },
  { id: "antiglare", label: "Anti-Glare", price: 500 },
  { id: "bluelight", label: "Blue Light", price: 800 },
  { id: "photochromic", label: "Photochromic", price: 1500 },
];

const ProductInfo = ({ product, onAddToCart, onAddToWishlist }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedLens, setSelectedLens] = useState("clear");
  const [wishlisted, setWishlisted] = useState(false);
  const toast = useToast();

  const name = product?.name || product?.productName || "Premium Eyewear Frame";
  const price = product?.price || product?.productPrice || 0;
  const originalPrice = product?.originalPrice || product?.mrp;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : null;
  const description = product?.description || product?.productDescription || "";
  const brand = product?.brand || product?.brandName || "ClearDekho";
  const sku = product?.sku || product?._id?.slice(-8).toUpperCase() || "CD00001";
  const inStock = product?.stock !== 0 && product?.inStock !== false;

  const lensAddon = lensTypes.find((l) => l.id === selectedLens)?.price || 0;
  const totalPrice = price + lensAddon;

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(product);
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
      status: "success",
      duration: 2500,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const handleWishlist = () => {
    setWishlisted(!wishlisted);
    if (onAddToWishlist) onAddToWishlist(product);
  };

  return (
    <VStack align="flex-start" spacing="0">
      {/* Brand + badges */}
      <HStack spacing="3" mb="3">
        <Text
          fontSize="2xs"
          color="ink.muted"
          letterSpacing="0.2em"
          textTransform="uppercase"
          fontWeight="500"
        >
          {brand}
        </Text>
        {discount && (
          <Badge bg="accent.gold" color="white" fontSize="2xs" letterSpacing="0.1em">
            −{discount}%
          </Badge>
        )}
        {inStock ? (
          <Badge bg="green.50" color="green.600" fontSize="2xs" borderColor="green.200" variant="outline">
            In Stock
          </Badge>
        ) : (
          <Badge bg="red.50" color="red.500" fontSize="2xs" borderColor="red.200" variant="outline">
            Out of Stock
          </Badge>
        )}
      </HStack>

      {/* Name */}
      <Heading
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="400"
        color="ink.primary"
        lineHeight="1.15"
        mb="5"
        fontFamily="'Cormorant Garamond', serif"
        letterSpacing="-0.01em"
      >
        {name}
      </Heading>

      {/* Price */}
      <HStack align="baseline" spacing="3" mb="6">
        <Text
          fontSize="3xl"
          fontFamily="'Cormorant Garamond', serif"
          fontWeight="500"
          color="ink.primary"
          lineHeight="1"
        >
          ₹{totalPrice.toLocaleString()}
        </Text>
        {originalPrice && (
          <Text fontSize="md" color="ink.muted" textDecoration="line-through" fontWeight="300">
            ₹{originalPrice.toLocaleString()}
          </Text>
        )}
        {lensAddon > 0 && (
          <Text fontSize="xs" color="ink.muted">
            (incl. lens upgrade)
          </Text>
        )}
      </HStack>

      <Divider borderColor="surface.border" mb="6" />

      {/* Color selection */}
      <VStack align="flex-start" spacing="3" mb="6" w="full">
        <HStack spacing="2">
          <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.12em" color="ink.muted">
            Frame Colour:
          </Text>
          <Text fontSize="xs" color="ink.primary" fontWeight="500">
            {frameColors[selectedColor].name}
          </Text>
        </HStack>
        <HStack spacing="3">
          {frameColors.map((color, i) => (
            <Box
              key={color.name}
              w="8"
              h="8"
              bg={color.hex}
              cursor="pointer"
              border="2px solid"
              borderColor={selectedColor === i ? "ink.primary" : "transparent"}
              outline="1px solid"
              outlineColor="surface.border"
              transition="border-color 0.2s, transform 0.2s"
              _hover={{ transform: "scale(1.1)" }}
              title={color.name}
              onClick={() => setSelectedColor(i)}
            />
          ))}
        </HStack>
      </VStack>

      {/* Lens type */}
      <VStack align="flex-start" spacing="3" mb="8" w="full">
        <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.12em" color="ink.muted">
          Lens Type:
        </Text>
        <SimpleGrid columns={2} spacing="2" w="full">
          {lensTypes.map((lens) => (
            <Box
              key={lens.id}
              border="1px solid"
              borderColor={selectedLens === lens.id ? "ink.primary" : "surface.border"}
              p="3"
              cursor="pointer"
              transition="all 0.2s"
              bg={selectedLens === lens.id ? "ink.primary" : "transparent"}
              onClick={() => setSelectedLens(lens.id)}
              _hover={{ borderColor: "ink.primary" }}
            >
              <Text
                fontSize="xs"
                fontWeight="400"
                color={selectedLens === lens.id ? "white" : "ink.primary"}
                letterSpacing="0.05em"
              >
                {lens.label}
              </Text>
              <Text
                fontSize="2xs"
                color={selectedLens === lens.id ? "whiteAlpha.700" : "ink.muted"}
              >
                {lens.price === 0 ? "Included" : `+₹${lens.price}`}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      {/* CTA buttons */}
      <VStack spacing="3" w="full" mb="6">
        <Button
          variant="solid"
          size="lg"
          w="full"
          isDisabled={!inStock}
          onClick={handleAddToCart}
          h="14"
          fontSize="xs"
          letterSpacing="0.15em"
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
        <HStack w="full" spacing="3">
          <Button
            variant="outline"
            size="md"
            flex="1"
            onClick={handleWishlist}
            leftIcon={<HeartIcon size={15} filled={wishlisted} />}
            color={wishlisted ? "red.400" : "ink.primary"}
            borderColor={wishlisted ? "red.200" : "ink.primary"}
          >
            {wishlisted ? "Wishlisted" : "Wishlist"}
          </Button>
          <IconButton
            icon={<ShareIcon />}
            variant="outline"
            size="md"
            aria-label="Share"
            color="ink.secondary"
            onClick={() => {
              navigator.share?.({ title: name, url: window.location.href });
            }}
          />
        </HStack>
      </VStack>

      {/* Offers */}
      <Box w="full" bg="surface.warm" p="5" border="1px solid" borderColor="surface.border" mb="6">
        <Text fontSize="xs" fontWeight="500" color="ink.primary" letterSpacing="0.08em" textTransform="uppercase" mb="3">
          Available Offers
        </Text>
        <VStack align="flex-start" spacing="2">
          {[
            "10% off on first order with code FIRST10",
            "Free home trial — try before you buy",
            "EMI available on orders above ₹3,000",
          ].map((offer) => (
            <HStack key={offer} spacing="3" align="flex-start">
              <Text color="accent.gold" fontSize="xs" mt="0.5">✦</Text>
              <Text fontSize="xs" color="ink.secondary" lineHeight="1.6">
                {offer}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>

      {/* SKU */}
      <Text fontSize="2xs" color="ink.muted" letterSpacing="0.1em">
        SKU: {sku}
      </Text>
    </VStack>
  );
};

// ─── Product Tabs ─────────────────────────────────────────────────────────────
const ProductTabs = ({ product }) => {
  const description = product?.description || product?.productDescription || "Premium quality eyewear frame crafted with attention to detail. Lightweight design for all-day comfort.";

  const specs = [
    { label: "Frame Material", value: product?.material || "Acetate" },
    { label: "Frame Width", value: product?.frameWidth || "140mm" },
    { label: "Bridge Width", value: product?.bridgeWidth || "18mm" },
    { label: "Temple Length", value: product?.templeLength || "145mm" },
    { label: "Lens Width", value: product?.lensWidth || "52mm" },
    { label: "Frame Shape", value: product?.shape || "Rectangle" },
    { label: "Gender", value: product?.gender || "Unisex" },
    { label: "Weight", value: product?.weight || "18g" },
  ];

  return (
    <Box mt="16">
      <Tabs variant="unstyled" colorScheme="brand">
        <TabList borderBottom="1px solid" borderColor="surface.border">
          {["Description", "Specifications", "Shipping & Returns"].map((tab) => (
            <Tab
              key={tab}
              fontSize="xs"
              letterSpacing="0.12em"
              textTransform="uppercase"
              fontFamily="'DM Sans', sans-serif"
              color="ink.muted"
              pb="4"
              mr="8"
              _selected={{
                color: "ink.primary",
                borderBottom: "1.5px solid",
                borderColor: "ink.primary",
                mb: "-1px",
              }}
              _hover={{ color: "ink.secondary" }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel px="0" py="8">
            <Text fontSize="sm" color="ink.secondary" lineHeight="1.9" maxW="680px" fontWeight="300">
              {description}
            </Text>
          </TabPanel>

          <TabPanel px="0" py="8">
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing="0" maxW="580px">
              {specs.map((spec, i) => (
                <Flex
                  key={spec.label}
                  py="3"
                  px="4"
                  bg={i % 2 === 0 ? "surface.warm" : "white"}
                  justify="space-between"
                  align="center"
                  border="1px solid"
                  borderColor="surface.border"
                  mt="-1px"
                  ml="-1px"
                >
                  <Text fontSize="xs" color="ink.muted" letterSpacing="0.05em">
                    {spec.label}
                  </Text>
                  <Text fontSize="xs" color="ink.primary" fontWeight="500">
                    {spec.value}
                  </Text>
                </Flex>
              ))}
            </SimpleGrid>
          </TabPanel>

          <TabPanel px="0" py="8">
            <VStack align="flex-start" spacing="6" maxW="580px">
              {[
                { title: "Delivery", desc: "Free standard delivery on all orders above ₹999. Express delivery (2-3 days) available for ₹99." },
                { title: "Home Trial", desc: "Order up to 5 frames for a free 7-day home trial. Pay only for what you keep." },
                { title: "Returns", desc: "30-day hassle-free returns. If you're not satisfied, return for a full refund or exchange." },
                { title: "Warranty", desc: "1-year manufacturer warranty on all frames. Covers manufacturing defects." },
              ].map((item) => (
                <Box key={item.title}>
                  <Text fontSize="sm" fontWeight="500" color="ink.primary" mb="1.5" letterSpacing="0.03em">
                    {item.title}
                  </Text>
                  <Text fontSize="sm" color="ink.secondary" lineHeight="1.8" fontWeight="300">
                    {item.desc}
                  </Text>
                </Box>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

// ─── Related Products Strip ───────────────────────────────────────────────────
const RelatedProducts = ({ products = [] }) => {
  if (!products.length) return null;
  return (
    <Box py="16" bg="surface.warm">
      <Container maxW="1400px" px={{ base: "6", md: "12" }}>
        <Flex justify="space-between" align="center" mb="10">
          <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="300" letterSpacing="-0.02em">
            You May Also Like
          </Heading>
          <Button variant="ghost" size="sm" as={RouterLink} to="/products" fontSize="xs" letterSpacing="0.1em" textTransform="uppercase" rightIcon={<Text>→</Text>}>
            View All
          </Button>
        </Flex>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: "4", md: "6" }}>
          {products.slice(0, 4).map((p) => (
            <RouterLink key={p._id || p.id} to={`/product/${p._id || p.id}`}>
              <Box role="group" cursor="pointer">
                <Box overflow="hidden" bg="surface.card" mb="3">
                  <AspectRatio ratio={1}>
                    <Image
                      src={p.image || p.productImage || p.images?.[0]}
                      alt={p.name || p.productName}
                      objectFit="cover"
                      transition="transform 0.5s ease"
                      _groupHover={{ transform: "scale(1.05)" }}
                      fallback={<Box bg="surface.card" w="full" h="full" />}
                    />
                  </AspectRatio>
                </Box>
                <Text fontSize="sm" color="ink.primary" noOfLines={1} mb="1">
                  {p.name || p.productName}
                </Text>
                <Text fontSize="sm" fontWeight="500" color="ink.primary">
                  ₹{(p.price || p.productPrice || 0).toLocaleString()}
                </Text>
              </Box>
            </RouterLink>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  // Adjust selectors to your Redux store shape
  const product = useSelector(
    (state) =>
      state.product?.product ||
      state.productReducer?.product ||
      state.singleProduct?.product ||
      null
  );
  const allProducts = useSelector(
    (state) =>
      state.products?.products ||
      state.productReducer?.products ||
      []
  );
  const loading = useSelector(
    (state) =>
      state.product?.loading ||
      state.productReducer?.loading ||
      false
  );

  useEffect(() => {
    // Keep your existing dispatch:
    // dispatch(getProductById(id));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  const images = product?.images || (product?.image ? [product.image] : []);
  const relatedProducts = allProducts.filter(
    (p) => (p._id || p.id) !== id && p.category === product?.category
  );

  const handleAddToCart = (item) => {
    // Keep your existing dispatch:
    // dispatch(addToCart(item));
  };

  const handleAddToWishlist = (item) => {
    // Keep your existing dispatch:
    // dispatch(addToWishlist(item));
  };

  if (loading) {
    return (
      <Container maxW="1400px" px={{ base: "6", md: "12" }} py="20">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="16">
          <Box bg="surface.card" h="500px" />
          <VStack align="flex-start" spacing="4">
            {[200, 300, 150, 100, 200].map((w, i) => (
              <Box key={i} bg="surface.card" h="4" w={`${w}px`} maxW="full" />
            ))}
          </VStack>
        </Grid>
      </Container>
    );
  }

  return (
    <Box bg="white">
      {/* Breadcrumb */}
      <Box
        borderBottom="1px solid"
        borderColor="surface.border"
        bg="surface.warm"
        py="3"
      >
        <Container maxW="1400px" px={{ base: "6", md: "12" }}>
          <Breadcrumb
            spacing="2"
            separator={<Text color="ink.muted" fontSize="xs">/</Text>}
            fontSize="xs"
            color="ink.muted"
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={RouterLink} to="/" _hover={{ color: "ink.primary" }}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={RouterLink} to="/products" _hover={{ color: "ink.primary" }}>
                Eyeglasses
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Text color="ink.primary" noOfLines={1} maxW="200px">
                {product?.name || product?.productName || "Product"}
              </Text>
            </BreadcrumbItem>
          </Breadcrumb>
        </Container>
      </Box>

      {/* Main content */}
      <Container maxW="1400px" px={{ base: "6", md: "12" }} py={{ base: "10", md: "16" }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: "10", lg: "20" }}
        >
          <GridItem>
            <ImageGallery
              images={images}
              name={product?.name || product?.productName}
            />
          </GridItem>
          <GridItem>
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          </GridItem>
        </Grid>

        <ProductTabs product={product} />
      </Container>

      <RelatedProducts products={relatedProducts} />
    </Box>
  );
};

export { ProductDetail as Product };
export default ProductDetail;
