import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GBP } from "@/utils/config";
import { ChevronsUpDownIcon, SearchIcon, ShoppingCartIcon } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import type { Product } from "../utils/schema/patient/shop";
import { http } from "@/utils/http";

type PriceSortType = null | "price-asc" | "price-desc";

function ShopPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [priceSort, setPriceSort] = useState<PriceSortType>(null);

  const filteredProducts = useMemo(() => {
    const query = searchParams.get("q");
    const sort = priceSort;
    let filtered: Product[] = [];
    if (query !== null) {
      const q = query.trim().toLowerCase();
      filtered = products.filter((p) => {
        if (!q) return true;
        return (
          p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
        );
      });
    } else {
      filtered = products;
    }

    if (sort === "price-asc")
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      filtered = [...filtered].sort((a, b) => b.price - a.price);

    return filtered;
  }, [products, priceSort, searchParams]);

  const searchProducts = async (e: React.ChangeEvent) => {
    e.preventDefault();
    setSearchParams({ q: (e.target as HTMLInputElement).value ?? "" });
  };

  const handleBuy = (p: Product) => {
    navigate("/portal/shop/checkout", { state: { product: p } });
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await http.get("patient/products");
        const data = await res.json();
        const filteredProducts = (data.products as []).filter(
          (p) => p["type"] !== "subscription",
        );
        setProducts(filteredProducts);
      } catch (err) {
        toast.error("Network error!\n\nFailed to load subscription data.");
      }
    }

    loadProducts();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex max-md:flex-col justify-between md:items-center gap-3">
          <legend className="text-xl font-semibold text-primary">
            Products
          </legend>

          <div className="w-full max-w-xs flex items-center gap-1 py-2 pl-4 border-slate-200 bg-slate-100 inset-shadow-xs">
            <label htmlFor="search-product-field">
              <SearchIcon className="size-5" />
            </label>
            <Input
              type="search"
              name="q"
              id="search-product-field"
              placeholder="Type here..."
              onChange={searchProducts}
              className="bg-transparent border-none rounded-none shadow-none"
            />
          </div>
        </div>

        <div className="w-full md:px-4 py-4">
          <table className="w-full border-separate border-spacing-0 max-lg:hidden">
            <thead>
              <tr className="text-left text-xs text-muted-foreground">
                <th className="px-3 py-3 font-medium">Product</th>
                <th className="px-3 py-3 font-medium">Description</th>
                <th className="px-3 py-3 font-medium">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="hover:bg-secondary rounded-none"
                    onClick={() => {
                      const sortValues: PriceSortType[] = [
                        null,
                        "price-asc",
                        "price-desc",
                      ];
                      const sortIndex = sortValues.indexOf(priceSort) + 1;

                      if (sortIndex >= sortValues.length)
                        setPriceSort(sortValues[0]);
                      else setPriceSort(sortValues[sortIndex]);
                    }}
                  >
                    <div className="w-fit flex items-center gap-2">
                      <span>Price</span>
                      <ChevronsUpDownIcon className="size-3" />
                    </div>
                  </Button>
                </th>
                <th className="px-3 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p, idx) => (
                <tr
                  key={p.id}
                  className={cn(
                    "align-top",
                    idx !== 0 && "border-t border-border",
                  )}
                >
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <p className="max-w-xl text-sm text-muted-foreground">
                      {p.desc}
                    </p>
                  </td>
                  <td className="px-3 py-4">
                    <div className="text-sm font-medium">
                      {GBP.format(p.price)}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <Button
                      onClick={() => handleBuy(p)}
                      className="rounded-none"
                      variant={"default"}
                      size="sm"
                    >
                      <ShoppingCartIcon className="mr-2 h-4 w-4" />
                      Buy now
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full lg:hidden">
            <div className="w-full grid gap-4">
              {filteredProducts.map((p) => (
                <Card key={p.id} className="rounded-none">
                  <CardHeader className="space-y-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-base">{p.name}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="px-1">{p.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      {GBP.format(p.price)}
                    </div>
                    <Button
                      onClick={() => handleBuy(p)}
                      className="rounded-none"
                    >
                      <ShoppingCartIcon className="mr-2 h-4 w-4" />
                      Buy now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopPage;
