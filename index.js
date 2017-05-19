/**
 * Realiza la comparación entre 2 valores.
 * Solamente se comparan cadenas y números.
 *
 * @param {Number|String} val1 Valor 1 a comparar.
 * @param {Number|String} val2 Valor 1 a comparar.
 *
 * @return {Number} Resultado de la comparación.
 */
function cmp(val1, val2)
{
    let _result = 0;
    let _type1  = typeof val1;
    let _type2  = typeof val2;
    if (_type1 !== _type2)
    {
        // Si son de diferente tipo, comparamos como textos.
        if (_type1 !== 'string')
        {
            val1   = '' + val1;
            _type1 = 'string';
        }
        if (_type2 !== 'string')
        {
            val2   = '' + val2;
        }
    }
    switch (_type1)
    {
        case 'number':
            _result = val1 - val2;
            break;
        case 'string':
            _result = val1.localeCompare(val2);
            break;
        default:
            throw new TypeError('Wrong types');
            break;
    }
    return _result;
}
/**
 * Devuelve los valores a usar a partir de los datos de entrada.
 *
 * @param {Array|Object} input Datos de entrada.
 *
 * @return {Array} Valores a usar en las comparaciones.
 */
function getValues(input)
{
    let _values;
    if (Array.isArray(input))
    {
        _values = input.sort();
    }
    else if (input && typeof input === 'object')
    {
        _values = Object.keys(input).sort();
    }
    else
    {
        throw new TypeError('Wrong input type');
    }
    return _values;
}
/**
 * Compara 2 array de valores escalares.
 *
 * También se pueden comparar 2 objetos para devolver las diferencias solamente
 * entre nombres de propiedades, es decir, las propiedades que están en uno
 * pero no en el otro o en ambos pero no compara sus valores, solamente sus nombres.
 *
 * Devuelve un array con 3 índices:
 *
 * - 0: Los elementos de arr1 que no están en arr2.
 * - 1: Los elementos que están en ambos arrays.
 * - 2: Los elementos de arr2 que no están en arr1.
 *
 * @param {Array|Object} arr1 Array/objeto con los valores a comparar.
 * @param {Array|Object} arr2 Array/objeto con los valores a comparar.
 *
 * @return {Array[]} Cambios encontrados.
 */
module.exports = function jfArrayDiff(arr1, arr2)
{
    const _arr1  = getValues(arr1);
    const _arr2  = getValues(arr2);
    const _equal = [];
    const _left  = [];
    const _right = [];
    // Hacemos una comprobación rápida
    if (_arr1.join('-@--@-') === _arr2.join('-@--@-'))
    {
        _equal.push(..._arr1);
    }
    else
    {
        const _len1 = _arr1.length;
        const _len2 = _arr2.length;
        let _idx1   = 0;
        let _idx2   = 0;
        while (_idx1 < _len1 && _idx2 < _len2)
        {
            const _val1 = _arr1[_idx1];
            const _val2 = _arr2[_idx2];
            const _cmp  = cmp(_val1, _val2);
            if (_cmp < 0)
            {
                _left.push(_val1);
                ++_idx1;
            }
            else if (_cmp > 0)
            {
                _right.push(_val2);
                ++_idx2;
            }
            else
            {
                _equal.push(_val1);
                ++_idx1;
                ++_idx2;
            }
        }
        _left.push(..._arr1.splice(_idx1));
        _right.push(..._arr2.splice(_idx2));
    }
    //
    return [_left, _equal, _right];
};
