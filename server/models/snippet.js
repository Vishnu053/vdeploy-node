var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SnippetsSchema = new Schema(
    {
        _id: String,
        Name: String,
        Author: String,
        ExecutionCommand: String,
        Description: String,
        TagNames: Array,
        CreatedOn: Date,
        LastUsedOn: Date,
        CanBeLinkedToAProject: Boolean,
        HasDependency: Boolean,
        DependsOn: String,
        Searchable: Boolean,
        RequirePasswordToExecute: Boolean,
        Status: { type: Number, default: 10 },
        LastDeletedOn: Date
    }
);

var Snippets = mongoose.model("Snippets", SnippetsSchema);
module.exports = Snippets;