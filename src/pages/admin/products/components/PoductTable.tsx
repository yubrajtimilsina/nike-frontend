import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  fetchCategoryItems,
  resetStatus,
} from "../../../../store/adminCategorySlice";
import { addProduct} from "../../../../store/adminProductSlice";
import { Status } from "../../../../globals/types/types";
import { fetchCollection } from "../../../../store/adminCollectionSlice";

interface ModalProps {
  closeModal: () => void;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  isNew: boolean;
  isStock: boolean;
  features: string[];
  discount: number;
  colors: string[];
  images: string | File;
  categoryId: string;
  brand: string;
  quantity: number;
  collectionId: string;
  totalStock: number;
}

const ProductTable: React.FC<ModalProps> = ({ closeModal }: ModalProps) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IProduct>({
    id: "",
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    isNew: false,
    isStock: false,
    features: [],
    discount: 0,
    colors: [],
    images: "",
    categoryId: "",
    brand: "",
    quantity: 0,
    collectionId: "",
    totalStock: 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (name === "images" && files) {
      setData({ ...data, images: files[0] });
    } else if (name === "isNew" || name === "isStock") {
      setData({ ...data, [name]: checked });
    } else if (name === "features" || name === "colors") {
      setData({ ...data, [name]: value.split(",").map((v) => v.trim()) });
    } else {
      setData({ ...data, [name]: type === "number" ? +value : value });
    }
  };

  const { items } = useAppSelector((store) => store.categories);
  const {collection} =useAppSelector((store)=>store.collections)
  const { status } = useAppSelector((store) => store.adminProducts);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addProduct(data))

   
  };

  const fetchCategories = () => {
    dispatch(fetchCategoryItems());
  };
  const fetchCollections=()=>{
    dispatch(fetchCollection())
  }

  useEffect(() => {
    if (status === Status.SUCCESS) {
      setLoading(false);
      closeModal();
      dispatch(resetStatus());
    }
  }, [status]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={closeModal}
      />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Add New Product
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Column 1 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Shoe Name *
                  </label>
                  <input
                    name="shoeName"
                    onChange={handleChange}
                    placeholder="Enter shoe name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Brand *
                  </label>
                  <input
                    name="brand"
                    onChange={handleChange}
                    placeholder="Enter brand name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price *
                  </label>
                  <input
                    name="price"
                    type="number"
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Original Price *
                  </label>
                  <input
                    name="originalPrice"
                    type="number"
                    onChange={handleChange}
                    placeholder="Enter original price"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Discount (%)
                  </label>
                  <input
                    name="discount"
                    type="number"
                    onChange={handleChange}
                    placeholder="Enter discount percentage"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Total Stock *
                  </label>
                  <input
                    name="totalStock"
                    type="number"
                    onChange={handleChange}
                    placeholder="Enter total stock"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                   <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Collection *
                  </label>
                  <select
                    name="collectionId"
                    onClick={fetchCollections}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a collection</option>
                    {collection.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.collectionName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category *
                  </label>
                  <select
                    name="categoryId"
                    onClick={fetchCategories}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a category</option>
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Colors (comma separated)
                  </label>
                  <input
                    name="colors"
                    onChange={handleChange}
                    placeholder="e.g., Red, Blue, Green"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                   <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sizes (comma separated)
                  </label>
                  <input
                    name="sizes"
                    onChange={handleChange}
                    placeholder="39,38.."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

              </div>
            </div>

            {/* Full width fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                onChange={handleChange}
                placeholder="Enter product description"
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Features (comma separated)
              </label>
              <input
                name="features"
                onChange={handleChange}
                placeholder="e.g., Waterproof, Lightweight, Breathable"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex items-center space-x-6">
              <label className="inline-flex items-center">
                <input
                  name="isNew"
                  type="checkbox"
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  New Product
                </span>
              </label>

              <label className="inline-flex items-center">
                <input
                  name="isStock"
                  type="checkbox"
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  In Stock
                </span>
              </label>
            </div>
            
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Product Image *
                  </label>
                  <input
                    name="images"
                    type="file"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-gray-200"
                  />
                </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
              <button
                type="button"
                onClick={closeModal}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Product...
                  </span>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;