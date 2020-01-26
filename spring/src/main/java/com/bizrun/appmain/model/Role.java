package com.bizrun.appmain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Role {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;
}
