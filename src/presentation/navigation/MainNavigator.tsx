export type MainStackParamList = {
  Catalog: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
  Orders: undefined;
  OrderDetail: { orderId: string };
  Payments: { orderId: string };
  Profile: undefined;
};

// Wire up with createBottomTabNavigator / createNativeStackNavigator
// once @react-navigation is installed
