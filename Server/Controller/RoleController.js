const { Role } = require('../Model')

const createRole = async (req, res) => {
  try {
    const { role_name } = req.body
    const role = await Role.create({ role_name })
    res.status(201).json({
      status: 201,
      data: role,
      message: 'Vai trò đã được tạo.',
    })
  } catch (error) {
    console.error('Lỗi khi tạo vai trò:', error)
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Lỗi server.',
    })
  }
}
const getRole = async (req, res) => {
  try {
    const roles = await Role.findAll()
    res.status(200).json({
      status: 200,
      data: roles,
      message: 'Danh sách vai trò.',
    })
  } catch (error) {
    console.error('Lỗi khi truy vấn danh sách vai trò:', error)
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Lỗi server.',
    })
  }
}
const updateRole = async (req, res) => {
  try {
    const { role_id } = req.params
    const { role_name } = req.body
    const role = await Role.findByPk(role_id)
    if (!role) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Vai trò không tồn tại.',
      })
    }
    role.role_name = role_name // Cập nhật tên vai trò
    await role.save()
    res.status(200).json({
      status: 200,
      data: role,
      message: 'Vai trò đã được cập nhật.',
    })
  } catch (error) {
    console.error('Lỗi khi cập nhật vai trò:', error)
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Lỗi server.',
    })
  }
}

const deleteRole = async (req, res) => {
  try {
    const { role_id } = req.params
    const role = await Role.findByPk(role_id)
    if (!role) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Vai trò không tồn tại.',
      })
    }
    await role.destroy()
    res.status(200).json({
      status: 200,
      data: null,
      message: 'Vai trò đã bị xóa.',
    })
  } catch (error) {
    console.error('Lỗi khi xóa vai trò:', error)
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Lỗi server.',
    })
  }
}
const searchRole = async (req, res) => {
  try {
    const { q } = req.query
    const roles = await Role.findAll({ where: { role_name: q } })
    res.status(200).json({
      status: 200,
      data: roles,
      message: 'Kết quả tìm kiếm.',
    })
  } catch (error) {
    console.error('Lỗi khi tìm kiếm vai trò:', error)
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Lỗi server.',
    })
  }
}

module.exports = { createRole, getRole, updateRole, deleteRole, searchRole }
