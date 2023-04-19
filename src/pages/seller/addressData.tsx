import React, { FC } from "react";

interface Address {
    id: number;
    fullName: string;
    addressDesc: string;
    province: string;
    district: string;
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
    fullName: 'Jednipat Kemawat',
    addressDesc: '219/9',
    province: 'กรุงเทพ',
    district: 'พระนคร',
    postalCode: '10200',
    phoneNumber: '0619848860',
}
]

export const onAddressesUpdate = (addresses: Address[]) => {}