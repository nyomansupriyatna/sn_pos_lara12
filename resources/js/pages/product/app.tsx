import axios from "axios"
import { useState } from "react"

type Product = {
    id: number
    name: string
    price: number
    image: string | null
}

function App() {

    const [products, setProducts] = useState<Product[]>([])
    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [image, setImage] = useState<File | null>(null)
    const [editId, setEditId] = useState<number | null>(null)

    const fetchProducts = async () => {
        const res = await axios.get<Product[]>("/products")
        setProducts(res.data)
    }

    // useEffect(() => {
    //     fetchProducts()
    // }, [])

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", name)
        formData.append("price", price)
        if (image) formData.append("image", image)

        if (editId) {
            post(`/products/${editId}`)
        } else {
            post("/products")
        }

        setName("")
        setPrice("")
        setImage(null)
        setEditId(null)
        fetchProducts()
    }

    const handleEdit = (p: Product) => {
        setName(p.name)
        setPrice(String(p.price))
        setEditId(p.id)
    }

    const handleDelete = async (id: number) => {
        await axios.delete(`/products/${id}`)
        fetchProducts()
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">
                Laravel 12 React TS CRUD
            </h1>

            <form onSubmit={handleSubmit} className="space-y-3 mb-6">

                <input
                    className="border p-2 w-full"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="number"
                    className="border p-2 w-full"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    type="file"
                    accept="image/jpeg/jpg/png"
                    className="border p-2 w-full"
                    onChange={(e) =>
                        setImage(e.target.files ? e.target.files[0] : null)
                    }
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    {editId ? "Update" : "Add"}
                </button>
            </form>

   
            <div className="grid grid-cols-3 gap-4">
                {products.map((p) => (
                    <div key={p.id} className="border p-3 rounded shadow">

                        {p.image && (
                            <img
                                src={`/storage/products/${p.image}`}
                                className="h-40 w-full object-cover mb-2"
                            />
                        )}

                        <h2 className="font-semibold">{p.name}</h2>
                        <p>Rp {p.price}</p>

                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => handleEdit(p)}
                                className="bg-yellow-400 px-2 py-1 rounded"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(p.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App
function post(67arg0: string) {
    throw new Error("Function not implemented.")
}

