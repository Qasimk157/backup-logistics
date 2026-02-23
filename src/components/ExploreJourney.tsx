import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { ProductService } from './ProductService';

export default function VerticalDemo() {
    const [products, setProducts] = useState<any>([]);
    
    useEffect(() => {
        ProductService.getProductsSmall().then((data) => 
            setProducts(data.slice(0, 34))
        );
    }, []);

    const productTemplate = (product: any) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-4 px-3">
                <div className="mb-3">
                    <img 
                        src={`/images/itemsExplore/${product.image}`} 
                        alt={product.name}
                        style={{
                            width: "1200px",
                            height: "600px",
                            objectFit: "cover",
                            borderRadius: "10px"
                        }}
                        className="shadow-2"
                    />
                </div>
                {/* <p className="font-medium">{product.name}</p> */}
            </div>
        );
    };

    return (
        <div className="card text-center">
            
            {/* ✅ Sentence above component */}
            <h2 
            style={{ 
                marginBottom: "20px",
                color: "green"
            }}
            >
            Explore our journey: A visual showcase of Backup Logistics in action across the logistics landscape
            </h2>

            <Carousel
                value={products}
                numVisible={1}
                numScroll={1}
                className="custom-carousel"
                circular
                autoplayInterval={2000}
                itemTemplate={productTemplate}
            />
        </div>
    );
}
