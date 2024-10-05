// Assuming you're using shadcn components
import {
  LucideTruck,
  LucideCheckCircle,
  LucideInfo,
  TimerIcon,
} from "lucide-react"; // For joyful icons
import OrderTable from "../OrderTable";
import { getOrderDetails } from "@/lib/fetchFunctions";
import { Badge } from "@/components/ui/badge";

const OrderDetails = async ({
  params: { orderId },
}: {
  params: { orderId: string };
}) => {
  const order = await getOrderDetails(orderId);

  if (!order) {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="p-10 mx-4 md:mx-16 bg-gray-100 text-center rounded-md text-lg font-semibold">
          Order Not Found
        </div>
      </div>
    );
  }

  const renderOrderStatus = () => {
    return (
      <>
        {order.status === "completed" ? (
          <Badge
            variant={"outline"}
            className="text-base px-4 py-2 rounded-full border-0"
          >
            Order Status:{" "}
            <Badge variant={"default"} className="ml-2 bg-green-500">
              Completed{" "}
              <LucideCheckCircle className="inline-block text-white mx-2" />
            </Badge>
          </Badge>
        ) : order.status === "processing" ? (
          <Badge
            variant={"outline"}
            className="text-base px-4 py-2 rounded-full border-0"
          >
            Order Status:{" "}
            <Badge
              variant={"default"}
              className="ml-2 bg-purple-500 animate-pulse"
            >
              Processing <TimerIcon className="inline-block text-white mx-2" />
            </Badge>
          </Badge>
        ) : order.status === "shipped" ? (
          <Badge
            variant={"outline"}
            className="text-base px-4 py-2 rounded-full border-0"
          >
            Order Status:{" "}
            <Badge variant={"default"} className="ml-2 bg-blue-500">
              Shipped <LucideTruck className="inline-block text-white mx-2" />
            </Badge>
          </Badge>
        ) : order.status === "failed" || order.status === "cancel" ? (
          <Badge
            variant={"destructive"}
            className="text-base px-4 py-2 rounded-full border-0"
          >
            Order Status: {order.status}{" "}
            <LucideInfo className="inline-block text-white mx-2" />
          </Badge>
        ) : (
          <Badge
            variant={"outline"}
            className="text-base px-4 py-2 rounded-full border-0"
          >
            Order Status:{" "}
            <Badge variant={"secondary"} className="ml-2">
              {order.status}{" "}
              <LucideInfo className="inline-block text-gray-700 mx-2" />
            </Badge>
          </Badge>
        )}
      </>
    );
  };

  return (
    <div className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col justify-center items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Order Details
        </h1>
        <p className="text-lg md:text-xl font-semibold mt-4">
          Order ID:{" "}
          <span className="text-base md:text-lg font-medium">#{order.id}</span>
        </p>
        <div className="mt-2">{renderOrderStatus()}</div>
      </div>

      {/* Order Info and Customer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Order Info */}
        <div className="text-left space-y-2">
          <p className="text-lg md:text-xl font-bold  uppercase">
            Customer Information
          </p>
          <p className="text-md md:text-lg">
            <span className="font-semibold">Name:</span> {order.customer.name}
          </p>
          {order.customer.email && (
            <p className="text-md md:text-lg">
              <span className="font-semibold">Email:</span>{" "}
              {order.customer.email}
            </p>
          )}
          <p className="text-md md:text-lg">
            <span className="font-semibold">Phone:</span>{" "}
            {order.customer.phoneNumber}
          </p>
        </div>

        {/* Shipping Info */}
        <div className="text-left space-y-2 md:ml-auto">
          <p className="text-lg md:text-xl font-bold  uppercase">
            Shipping Address
          </p>
          <p className="text-md md:text-lg">{order?.shipping?.address}</p>
          <p className="text-md md:text-lg">
            {order?.shipping?.district}, {order?.shipping?.division}
          </p>
        </div>
      </div>

      {/* Order Table */}
      <OrderTable order={order} />
    </div>
  );
};

export default OrderDetails;