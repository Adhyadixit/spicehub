
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AddressesTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Addresses</CardTitle>
        <CardDescription>
          Manage your shipping addresses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-gray-500">
          No addresses saved.
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-brand-saffron hover:bg-brand-brown"
          disabled
        >
          Add New Address
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressesTab;
