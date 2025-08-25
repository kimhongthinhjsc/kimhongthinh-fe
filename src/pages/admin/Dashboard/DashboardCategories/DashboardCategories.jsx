// src/pages/admin/DashboardCategories.jsx
import React, { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  createSubcategory,
  deleteSubcategory,
} from "~/services/categorieAPI";
import SearchBar from "~/components/SearchBar/SearchBar";
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";
import Pagination from "~/components/Pagination/Pagination";
import CategoryTableSkeleton from "./CategoryTableSkeleton";

export default function DashboardCategories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAddingSub, setIsAddingSub] = useState(false);
  const [parentId, setParentId] = useState(null);

  useEffect(() => {
    loadCategories();
  }, [currentPage, search]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories({
        page: currentPage,
        limit: itemsPerPage,
        search: search || "",
      });
      setCategories(res.categories || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error("Lỗi load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, isSub = false) => {
    if (window.confirm("Xóa danh mục này?")) {
      if (isSub) {
        await deleteSubcategory(id);
      } else {
        await deleteCategory(id);
      }
      loadCategories();
    }
  };

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setIsAddingSub(false);
    setParentId(null);
    setModalOpen(true);
  };

  const handleAddSub = (cat) => {
    setParentId(cat._id);
    setIsAddingSub(true);
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleSave = async (newName) => {
    if (!newName) return;
    try {
      if (isAddingSub && parentId) {
        await createSubcategory({ name: newName, categoryId: parentId });
      } else if (editingCategory) {
        await updateCategory(editingCategory._id, { name: newName });
      } else {
        await createCategory({ name: newName });
      }
      loadCategories();
    } catch (err) {
      console.error("❌ handleSave error:", err);
    } finally {
      setModalOpen(false);
      setEditingCategory(null);
      setIsAddingSub(false);
      setParentId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            setEditingCategory(null);
            setIsAddingSub(false);
            setParentId(null);
            setModalOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Thêm danh mục
        </button>
      </div>

      <SearchBar
        value={search}
        onSearch={(k) => {
          setSearch(k);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <CategoryTableSkeleton />
      ) : (
        <CategoryTable
          categories={categories}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onAddSub={handleAddSub}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal thêm/sửa */}
      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialName={isAddingSub ? "" : editingCategory?.name}
        onSave={handleSave}
      />
    </div>
  );
}
