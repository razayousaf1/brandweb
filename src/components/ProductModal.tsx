"use client";

import { useState } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Minus, Plus, X } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 1 && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }

    addToCart(product.id, quantity, selectedSize || product.sizes?.[0]);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    onClose();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    toast({
      title: "Redirecting to checkout",
      description: "This would normally redirect to the checkout page.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden" data-testid={`modal-product-${product.id}`}>
        <div className="grid md:grid-cols-2 h-full">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid={`modal-img-product-${product.id}`}
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 border-0"
              onClick={onClose}
              data-testid="button-close-modal"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <DialogHeader>
                <DialogTitle className="font-serif text-3xl font-bold text-card-foreground mb-4" data-testid="text-modal-product-name">
                  {product.name}
                </DialogTitle>
              </DialogHeader>
              
              <p className="text-3xl font-bold text-primary mb-6" data-testid="text-modal-product-price">
                PKR {product.price}
              </p>
              
              <p className="text-muted-foreground text-lg mb-8" data-testid="text-modal-product-description">
                {product.description}
              </p>

              <div className="space-y-6 mb-8">
                {product.sizes && product.sizes.length > 1 && (
                  <div>
                    <Label className="text-sm font-medium text-card-foreground mb-2">Size</Label>
                    <Select value={selectedSize} onValueChange={setSelectedSize} data-testid="select-size">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.sizes.map((size: string) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium text-card-foreground mb-2">Quantity</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      data-testid="button-decrease-quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center"
                      min="1"
                      data-testid="input-quantity"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      data-testid="button-increase-quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full btn-primary py-4 text-lg font-semibold"
                onClick={handleAddToCart}
                disabled={isLoading}
                data-testid="button-modal-add-to-cart"
              >
                {isLoading ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button
                className="w-full bg-accent text-accent-foreground py-4 text-lg font-semibold hover:bg-accent/90 transition-colors"
                onClick={handleBuyNow}
                disabled={isLoading}
                data-testid="button-buy-now"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}