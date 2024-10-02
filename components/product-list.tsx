"use client";

import { SearchIcon, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import { Product } from "@/utils/types/products";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://necessary-fitness-7f18cf0ed1.strapiapp.com/api/product");
      const data = await response.json();
      setProducts(data.data);
      setLoading(false);
    } catch {
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) => product.brand.toLowerCase().includes(searchTerm.toLowerCase()) || product.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Tech Shop</h1>
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search by Brand or Model"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center">Brand</TableHead>
                <TableHead className="text-center">Model</TableHead>
                <TableHead className="text-center">Screen Size</TableHead>
                <TableHead className="text-center">Color</TableHead>
                <TableHead className="text-center">Hard Disk</TableHead>
                <TableHead className="text-center">CPU</TableHead>
                <TableHead className="text-center">RAM</TableHead>
                <TableHead className="text-center">OS</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead className="text-center">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product: Product, index: number) => (
                <TableRow key={product.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <TableCell className="text-center">{product.brand}</TableCell>
                  <TableCell className="text-center">{product.model}</TableCell>
                  <TableCell className="text-center">{product.screen_size}</TableCell>
                  <TableCell className="text-center">{product.color}</TableCell>
                  <TableCell className="text-center">{product.harddisk}</TableCell>
                  <TableCell className="text-center">{product.cpu}</TableCell>
                  <TableCell className="text-center">{product.ram}</TableCell>
                  <TableCell className="text-center">{product.OS}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">{product.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-semibold text-blue-600">${product.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
