import React, { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from '@/components/input-error';
import { Loader2 } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
const breadcrumbs = [
    {
        title: 'Products',
        href: '/products',
    },
];

const ProductPage = () => {

    const { products } = usePage().props
    const [isUpdateOpened, setIsUpdateOpened] = useState(false)
    const [isDeleteOpened, setIsDeleteOpened] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const { data, setData, post, processing, errors, reset, put, delete: destroy } = useForm({
        "name": "",
        "price": 0,
        "quantity": 0
    })


    const submitProduct = () => {
        post("product/store", {

            onError: () => { alert("mochkila") },
            onSuccess: () => { reset("name", "price", "quantity") },
            onFinish: () => {
                product_modal.click()
            }
        })
    }


    const updateProduct = () => {

        put("/product/update/" + selectedProduct.id, {
            onError: () => {

                // todo handle  remove   error  message 
            },
            onSuccess: () => { setIsUpdateOpened(false) },
            onFinish: () => { reset("name", "price", "quantity") },
        })



    }


    const deleteProduct = () => {

        destroy("/product/destroy/" + selectedProduct?.id , {
            onFinish: () => {setIsDeleteOpened(false)}
        })
    }



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className=" flex items-center justify-between p-6">
                <h1>Product</h1>


                {/* create  product */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button id='product_modal' variant="outline">Create Product</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Create new Product</DialogTitle>
                            <DialogDescription>
                                PLease  insert a valid data  to create  the new  product
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                    Product Name
                                </Label>
                                <Input
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder='Insert a valid Product Name'
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="">
                                <Label htmlFor="link" className="sr-only">
                                    Product Price
                                </Label>
                                <Input
                                    value={data.price}
                                    onChange={(e) => setData("price", e.target.value)}
                                    type='number'
                                    min={0}
                                    placeholder='Insert a valid Product Price'
                                />
                                <InputError message={errors.price} />
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                    Stock
                                </Label>
                                <Input
                                    value={data.quantity}
                                    onChange={(e) => setData("quantity", e.target.value)}
                                    type='number'
                                    min={0}

                                    placeholder='Insert a valid Product Quantity'
                                />
                                <InputError message={errors.quantity} />
                            </div>
                        </div>
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button onClick={submitProduct} type="button" variant="default">
                                {processing ? <div className="flex gap-3"><Loader2 className='animate-spin' />  Submiting ... </div> : "Create"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>


            {/* update  product */}
            <Dialog open={isUpdateOpened} onOpenChange={setIsUpdateOpened}>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Update Product Info</DialogTitle>

                    </DialogHeader>
                    <div className="space-y-6">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Product Name
                            </Label>
                            <Input
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder='Insert a valid Product Name'
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="">
                            <Label htmlFor="link" className="sr-only">
                                Product Price
                            </Label>
                            <Input
                                value={data.price}
                                onChange={(e) => setData("price", e.target.value)}
                                type='number'
                                min={0}
                                placeholder='Insert a valid Product Price'
                            />
                            <InputError message={errors.price} />
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Stock
                            </Label>
                            <Input
                                value={data.quantity}
                                onChange={(e) => setData("quantity", e.target.value)}
                                type='number'
                                min={0}

                                placeholder='Insert a valid Product Quantity'
                            />
                            <InputError message={errors.quantity} />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button onClick={() => setIsUpdateOpened(false)} type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button onClick={updateProduct} type="button" variant="default">
                            {processing ? <div className="flex gap-3"><Loader2 className='animate-spin' />  Updating ... </div> : "Update"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>




            {/* Delete  product */}
            <Dialog open={isDeleteOpened} onOpenChange={setIsDeleteOpened}>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogDescription>Are you sure  you want to delete  this product {selectedProduct?.name}</DialogDescription>

                    </DialogHeader>

                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button onClick={() => setIsUpdateOpened(false)} type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button onClick={deleteProduct} type="button" variant="destructive">
                            {processing ? <div className="flex gap-3"><Loader2 className='animate-spin' />  Deleting ... </div> : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>



            <div className="px-6">

                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] uppercase">Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="">Quantity</TableHead>
                            <TableHead className="">Edit</TableHead>
                            <TableHead className="">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            products?.map((p, i) =>
                                <>
                                    <TableRow>
                                        <TableCell className="font-medium">{p.id}</TableCell>
                                        <TableCell>{p.name}</TableCell>
                                        <TableCell className="">${p.price}</TableCell>
                                        <TableCell className="">{p.quantity} </TableCell>
                                        <TableCell className=""><Button
                                            onClick={() => {
                                                setIsUpdateOpened(true)
                                                setData({
                                                    name: p.name,
                                                    price: p.price,
                                                    quantity: p.quantity
                                                })
                                                setSelectedProduct(p)
                                            }}
                                            variant="default">Edit</Button>

                                        </TableCell>
                                        <TableCell className=""><Button
                                            onClick={() => {
                                                setIsDeleteOpened(true)
                                                setSelectedProduct(p)
                                            }}
                                            variant="destructive">Delete</Button>

                                        </TableCell>

                                    </TableRow>
                                </>

                            )
                        }
                    </TableBody>
                </Table>


            </div>
        </AppLayout>
    );
};

export default ProductPage;