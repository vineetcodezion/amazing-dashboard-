import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PageManager = () => {
  const [pages, setPages] = useState([]);
  const [newPage, setNewPage] = useState({
    title: '',
    order: '',
    description: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    sections: [{ title: '', content: '' }],
  });

  // Fetch pages from the backend
  const fetchPages = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8081/api/v1/manage-pages'
      );
      setPages(response.data);
    } catch (error) {
      console.error('Error fetching pages', error);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPage({ ...newPage, [name]: value });
  };

  // Handle rich text editor change
  const handleDescriptionChange = (value) => {
    setNewPage({ ...newPage, description: value });
  };

  // Handle section change
  const handleSectionChange = (index, e) => {
    const updatedSections = newPage.sections.map((section, i) =>
      i === index ? { ...section, [e.target.name]: e.target.value } : section
    );
    setNewPage({ ...newPage, sections: updatedSections });
  };

  // Add a new section
  const addSection = () => {
    setNewPage({
      ...newPage,
      sections: [...newPage.sections, { title: '', content: '' }],
    });
  };

  // Save the page to the backend
  const savePage = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8081/api/v1/manage-pages',
        newPage
      );
      setPages([...pages, response.data]);
      setNewPage({
        title: '',
        order: '',
        description: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        sections: [{ title: '', content: '' }],
      });
    } catch (error) {
      console.error('Error saving page', error);
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto min-h-[200vh]">
      <h2 className="text-2xl font-bold">Manage Pages</h2>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        {/* Page Title */}
        <div>
          <label className="block text-gray-700">Page Title</label>
          <input
            type="text"
            name="title"
            value={newPage.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter page title"
          />
        </div>

        {/* Page Order */}
        <div>
          <label className="block text-gray-700">Page Order</label>
          <input
            type="number"
            name="order"
            value={newPage.order}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter page order"
          />
        </div>

        {/* Page Description with React Quill */}
        <div>
          <label className="block text-gray-700">Page Description</label>
          <ReactQuill
            value={newPage.description}
            onChange={handleDescriptionChange}
            className="mt-1 border border-gray-300 rounded-md"
            placeholder="Enter page description with rich text formatting"
          />
        </div>

        {/* Meta Information */}
        <h3 className="text-lg font-semibold">Meta Information</h3>
        <div>
          <label className="block text-gray-700">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={newPage.metaTitle}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter meta title"
          />
        </div>
        <div>
          <label className="block text-gray-700">Meta Description</label>
          <textarea
            name="metaDescription"
            value={newPage.metaDescription}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            rows="2"
            placeholder="Enter meta description"
          />
        </div>
        <div>
          <label className="block text-gray-700">Meta Keywords</label>
          <input
            type="text"
            name="metaKeywords"
            value={newPage.metaKeywords}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter meta keywords"
          />
        </div>

        {/* Page Sections */}
        <h3 className="text-lg font-semibold">Page Sections</h3>
        {newPage.sections.map((section, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md mb-2">
            <label className="block text-gray-700">Section Title</label>
            <input
              type="text"
              name="title"
              value={section.title}
              onChange={(e) => handleSectionChange(index, e)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Enter section title"
            />
            <label className="block text-gray-700 mt-2">Section Content</label>
            <textarea
              name="content"
              value={section.content}
              onChange={(e) => handleSectionChange(index, e)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              rows="3"
              placeholder="Enter section content"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addSection}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Add Section
        </button>

        {/* Save Button */}
        <button
          type="button"
          onClick={savePage}
          className="bg-green-500 text-white w-full p-3 rounded-md mt-4"
        >
          Save Page
        </button>
      </div>

      {/* Display saved pages */}
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">Saved Pages</h2>
        <div className="overflow-x-auto border rounded-lg shadow-lg">
          <table className="w-full bg-white">
            <thead>
              <tr className="text-left border-b bg-gray-100">
                <th className="p-4 font-semibold text-gray-700">Page Title</th>
                <th className="p-4 font-semibold text-gray-700">Order</th>
                <th className="p-4 font-semibold text-gray-700">Description</th>
                <th className="p-4 font-semibold text-gray-700">Meta Title</th>
                <th className="p-4 font-semibold text-gray-700">
                  Meta Description
                </th>
                <th className="p-4 font-semibold text-gray-700">
                  Meta Keywords
                </th>
                <th className="p-4 font-semibold text-gray-700">Sections</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-4 font-medium text-gray-800">
                    {page.title}
                  </td>
                  <td className="p-4 text-gray-600">{page.order}</td>
                  <td className="p-4 text-gray-600">
                    <span
                      dangerouslySetInnerHTML={{ __html: page.description }}
                    />
                  </td>
                  <td className="p-4 text-gray-600">{page.metaTitle}</td>
                  <td className="p-4 text-gray-600">{page.metaDescription}</td>
                  <td className="p-4 text-gray-600">{page.metaKeywords}</td>
                  <td className="p-4">
                    {/* Sections Table */}
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-gray-50 border rounded-lg">
                        <thead>
                          <tr className="text-left bg-gray-200">
                            <th className="p-2 font-semibold text-gray-700">
                              Section Title
                            </th>
                            <th className="p-2 font-semibold text-gray-700">
                              Section Content
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {page.sections.map((section, secIdx) => (
                            <tr key={secIdx} className="border-b">
                              <td className="p-2 font-medium text-gray-800">
                                {section.title}
                              </td>
                              <td className="p-2 text-gray-600">
                                {section.content}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PageManager;
