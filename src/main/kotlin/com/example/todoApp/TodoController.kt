package com.example.todoApp

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController





@RestController
@CrossOrigin(origins = ["http://localhost:3000"])
class TodoController(@Autowired private val repository: TodoRepository) {

    @GetMapping("/")
    fun hello(): String {
        return "やっほーサーバとつながったよ"
    }

    @GetMapping("/api/getmemo")
    fun getMemo(): List<TodoEntity> {
        return repository.findAll().toList()
    }

    @PostMapping("/api/post")
    fun postMemo(@RequestBody req: TodoRequest): TodoEntity {
        println(req)
        return repository.save(
            TodoEntity(
                filename = req.filename,
                title = req.title,
                content = req.content
            )
        )
    }

    @PatchMapping("/api/patch")
    fun patchMemo(@RequestBody req: TodoRequestWithId): TodoEntity {
        val theData = repository.findById(req.id)
            .orElseThrow { IllegalArgumentException("No entity with id ${req.id}") }

        theData.title = req.title
        theData.content = req.content

        return repository.save(theData)
    }

    @DeleteMapping("/api/delete")
    fun deleteMemo(@RequestBody req: DeleteRequest): String {
        println("受け取ったID: ${req.id}")
        repository.deleteById(req.id)
        return "deleted"
    }

}


