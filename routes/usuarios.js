const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y mas de 6 dígitos').isLength({ min:6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( existeEmail ),
        //check('rol').custom( ( rol ) => esRolValido( rol ) ),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPost );

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPut );

router.patch('/', usuariosPatch );

router.delete('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usuariosDelete );


module.exports = router;