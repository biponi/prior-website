"use client";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { MdStar } from "react-icons/md";

import LikeButton from "@/components/LikeButton";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import InputNumber from "@/shared/InputNumber/InputNumber";
import { CartItem, useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateToCart } = useCart();

  const renderProduct = (
    item: CartItem,
    removeFromCart: (id: string) => void
  ) => {
    const { id, name, thumbnail, unitPrice, categoryName, quantity } = item;
    return (
      <div key={name} className='flex py-5 last:pb-0'>
        <div className='relative h-24 w-24 shrink-0 overflow-hidden rounded-xl md:h-40 md:w-40'>
          <Image
            fill
            src={thumbnail}
            alt={name}
            className='h-full w-full object-contain object-center'
          />
          <Link className='absolute inset-0' href={`/products/${id}`} />
        </div>

        <div className='ml-4 flex flex-1 flex-col justify-between'>
          <div>
            <div className='flex justify-between '>
              <div>
                <h3 className='font-medium md:text-2xl '>
                  <Link href={`/products/${id}`}>{name}</Link>
                </h3>
                <span className='my-1 text-sm text-neutral-500'>
                  {categoryName}
                </span>
                <div className='flex items-center gap-1'>
                  <MdStar className='text-yellow-400' />
                  <span className='text-sm'>{5}</span>
                </div>
              </div>
              <span className='font-medium md:text-xl'>৳{unitPrice}</span>
            </div>
          </div>
          <div className='flex w-full items-end justify-between text-sm'>
            <div className='flex items-center gap-3'>
              <LikeButton />
              <AiOutlineDelete
                className='text-2xl'
                onClick={() => removeFromCart(id)}
              />
            </div>
            <div>
              <InputNumber
                defaultValue={quantity}
                min={1}
                max={20}
                onChange={(value) => {
                  updateToCart({
                    ...item,
                    quantity: value,
                    totalPrice: Number(unitPrice) * Number(value),
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='nc-CartPage'>
      <main className='container py-16 lg:pb-28 lg:pt-20 '>
        <div className='mb-14'>
          <h2 className='block text-2xl font-medium sm:text-3xl lg:text-4xl'>
            Your Cart
          </h2>
        </div>

        <hr className='my-10 border-neutral-300 xl:my-12' />

        {cart.length > 0 && (
          <div className='flex flex-col lg:flex-row'>
            <div className='w-full divide-y divide-neutral-300 lg:w-[60%] xl:w-[55%]'>
              {cart.map((item) => renderProduct(item, removeFromCart))}
            </div>
            <div className='my-10 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:mx-16 2xl:mx-20' />
            <div className='flex-1'>
              <div className='sticky top-28'>
                <h3 className='text-2xl font-semibold'>Summary</h3>
                <div className='mt-7 divide-y divide-neutral-300 text-sm'>
                  <div className='flex justify-between pb-4'>
                    <span>Subtotal</span>
                    <span className='font-semibold'>
                      {cart.reduce((sum, cartdata) => {
                        sum = Number(sum) + Number(cartdata.totalPrice);
                        return sum;
                      }, 0)}
                    </span>
                  </div>

                  <div className='flex justify-between pt-4 text-base font-semibold'>
                    <span>Total</span>
                    <span>
                      ৳
                      {cart.reduce((sum, cartdata) => {
                        sum =
                          Number(sum) +
                          Number(cartdata.quantity) *
                            Number(cartdata.unitPrice);
                        return sum;
                      }, 0)}
                    </span>
                  </div>
                </div>
                <ButtonPrimary href='/checkout' className='mt-8 w-full'>
                  Checkout Now
                </ButtonPrimary>
              </div>
            </div>
          </div>
        )}
        {cart.length < 1 && (
          <div className='w-full p-28 flex justify-center items-center'>
            No Product Added in cart
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
