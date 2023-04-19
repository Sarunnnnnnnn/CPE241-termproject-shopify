import React, { FC } from "react";

interface Address {
  id: number;
  fullName: string;
  addressDesc: string;
  district: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
}
interface MyAddressProps {
  addresses: Address[];
  onAddressesUpdate: (addresses: Address[]) => void;
}

export const Address: Address[] = [
  {
    id: 1,
    fullName: 'John Doe',
    addressDesc: '123/456 ',
    district: 'Samphanthawong',
    province: 'Bangkok',
    postalCode: '10100',
    phoneNumber: '0812345678',
  }

]

export const onAddressesUpdate = (addresses: Address[]) => { }