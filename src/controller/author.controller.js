import {Author, Book} from "../model/index.js";
import {sequelize} from "../config/database.js";

export const findBookAuthors = async (req, res) => {
    try {
        const {isbn} = req.params;
        const book = await Book.findByPk(isbn);
        if (!book) {
            return res.status(404).json({error: "Book not found"});
        }
        const authors = await book.getAuthors();
        const response = authors.map(author => ({
            name: author.name,
            birthDate: author.birthDate
        }))
        return res.json(response);
    } catch (e) {
        console.error('Error finding book authors', e);
        return res.status(500).json({
            error: 'Failed to find book authors'
        })
    }
}
export const removeByAuthors = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const {author} = req.params;
        const remAuthor = await Author.destroy({
            where: { name: author },
            transaction: t
        });
        if (!remAuthor) {
            await t.rollback();
            return res.status(404).json({error: "Author not found"});
        }
        await t.commit()
        return res.json(remAuthor);
    }catch (e){
        await t.rollback();
        console.error('Error finding book by author', e);
        return res.status(500).json({
            error: 'Failed to find book by author'
        })
    }
}